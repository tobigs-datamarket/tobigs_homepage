"""리쿠르팅 페이지 단체사진에서 사람만 남기고 배경을 투명하게 만든다.
group.webp 를 바꾸면 반드시 다시 돌린다(안 그러면 옛 사람 레이어가 새 사진 위에 어긋나게 겹친다).

  python scripts/cutout_people.py public/images/recruiting/group.webp public/images/recruiting/group-people.webp

필요: torch, transformers, pillow, numpy, scipy. 처음 실행 때 모델(약 400MB)을 Hugging Face 에서 내려받는다.
Mask2Former(COCO panoptic)로 픽셀마다 '사람일 확률'을 구해 알파로 쓴다.
"""
import sys

import numpy as np
import torch
from PIL import Image
from scipy.ndimage import gaussian_filter
from transformers import AutoImageProcessor, Mask2FormerForUniversalSegmentation

MODEL = "facebook/mask2former-swin-base-coco-panoptic"
src, dst = sys.argv[1:3]
img = Image.open(src).convert("RGB")
W, H = img.size

# 짧은 변 800 + 32의 배수로 직접 맞춰 넣는다(프로세서의 리사이즈·패딩이 마스크를 어긋나게 하지 않도록)
h = 800
w = round(W * h / H / 32) * 32
proc = AutoImageProcessor.from_pretrained(MODEL)
model = Mask2FormerForUniversalSegmentation.from_pretrained(MODEL).eval()
inputs = proc(images=img.resize((w, h), Image.LANCZOS), do_resize=False, return_tensors="pt")
assert inputs["pixel_values"].shape[-2:] == (h, w), inputs["pixel_values"].shape
with torch.no_grad():
    out = model(**inputs)

# 의미 분할 점수 = Σ_query P(class) × mask. 사람 점수 / 전체 점수 = 그 픽셀이 사람일 확률
cls = out.class_queries_logits.softmax(-1)[0, :, :-1]
masks = out.masks_queries_logits.sigmoid()[0]
score = torch.einsum("qc,qhw->chw", cls, masks)
score = torch.nn.functional.interpolate(score[None], size=(H, W), mode="bilinear", align_corners=False)[0]
p = (score[model.config.label2id["person"]] / score.sum(0).clamp_min(1e-6)).numpy()

alpha = gaussian_filter(np.clip((p - 0.35) / 0.3, 0, 1), 0.7)
rgba = np.dstack([np.asarray(img), (alpha * 255).astype(np.uint8)])
Image.fromarray(rgba).save(dst, "WEBP", quality=88)
print("saved", dst, "person coverage %.1f%%" % (alpha.mean() * 100))
