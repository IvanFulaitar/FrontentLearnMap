import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";

// React Router does not reset scroll position between route changes on its
// own, so clicking "Наступний урок" (or any other link) kept the viewport at
// whatever scroll position the previous, longer lesson page was left at.
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

export function App() {
  return (
    <AppLayout>
      <ScrollToTop />
      <Outlet />
    </AppLayout>
  );
}
