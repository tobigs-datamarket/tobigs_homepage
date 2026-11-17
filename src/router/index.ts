import { useLocation, useNavigate, useNavigationType, type NavigateFunction } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import { useEffect, useRef } from "react";
import routes from "./config";

let navigateResolver: (navigate: ReturnType<typeof useNavigate>) => void;

declare global {
  interface Window {
    REACT_APP_NAVIGATE: ReturnType<typeof useNavigate>;
    gtag?: (...args: unknown[]) => void;
  }
}

export const navigatePromise = new Promise<NavigateFunction>((resolve) => {
  navigateResolver = resolve;
});

export function AppRoutes() {
  const element = useRoutes(routes);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const navType = useNavigationType();
  // 다른 페이지로 이동하면 맨 위로 (뒤로가기는 브라우저 스크롤 복원 유지, 같은 페이지의 검색어 변경은 제외)
  const prevPath = useRef(pathname);
  useEffect(() => {
    if (prevPath.current !== pathname && navType !== "POP") window.scrollTo({ top: 0, behavior: "instant" });
    prevPath.current = pathname;
  }, [pathname, navType]);
  // GA4 page_view: 자식(SEO) effect가 먼저 돌아 document.title이 새 페이지 제목으로 바뀐 뒤 보낸다.
  // GA 관리 > 데이터 스트림 > 향상된 측정 > "브라우저 기록 이벤트 기반 페이지 변경"을 꺼야 중복 집계되지 않는다.
  useEffect(() => {
    window.gtag?.('event', 'page_view', { page_title: document.title, page_location: window.location.href });
  }, [pathname]);
  useEffect(() => {
    window.REACT_APP_NAVIGATE = navigate;
    navigateResolver(window.REACT_APP_NAVIGATE);
  });
  return element;
}
