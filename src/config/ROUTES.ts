import { Dashboard, Preview } from "../pages";

const ROUTES = {
  DASHBOARD: "/",
  PREVIEW: "preview/:id",
};

const ROUTES_CONFIG = [
  {
    path: ROUTES.DASHBOARD,
    page: Dashboard,
  },
  {
    path: ROUTES.PREVIEW,
    page: Preview,
  },
];

export default ROUTES;
export { ROUTES_CONFIG };
