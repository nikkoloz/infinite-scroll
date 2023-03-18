import { Route, Routes as RoutesList } from "react-router-dom";
import { ROUTES_CONFIG } from "./ROUTES.js";

function RoutesLib() {
  return (
    <RoutesList>
      {ROUTES_CONFIG.map((route) => {
        const Page = route.page;
        return <Route key={route.path} path={route.path} element={<Page />} />;
      })}
      <Route path="*" element={<h1>Not Found</h1>} />
    </RoutesList>
  );
}

export default RoutesLib;
