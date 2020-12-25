// Import AuthType Enum
import AuthType from "./AuthType";

/**
 * @notice Some of these less frequented routes uses lazily loaded components
 *
 * route level code-splitting
 * this generates a separate chunk (about.[hash].js) for this route
 * which is lazy-loaded when the route is visited.
 */
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
    meta: { Auth_requirements: AuthType.private },
  },
  {
    path: "/custom-list",
    name: "custom-list",
    component: () => import("@/views/CustomList.vue"),
    meta: { Auth_requirements: AuthType.private },
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("@/views/Settings.vue"),
    meta: { Auth_requirements: AuthType.private },
  },
];

export default routes;
