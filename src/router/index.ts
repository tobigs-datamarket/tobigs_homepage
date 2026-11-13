import { useLocation, useNavigate, useNavigationType, type NavigateFunction } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import { useEffect, useRef } from "react";
import routes from "./config";

let navigateResolver: (navigate: ReturnType<typeof useNavigate>) => void;

declare global {
  interface Window {
    REACT_APP_NAVIGATE: ReturnType<typeof useNavigate>;
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
  useEffect(() => {
    window.REACT_APP_NAVIGATE = navigate;
    navigateResolver(window.REACT_APP_NAVIGATE);
  });
  return element;
}
