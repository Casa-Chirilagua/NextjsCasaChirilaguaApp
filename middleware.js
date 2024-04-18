export {default} from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/dashboard/:page*",
    "/families/:page*",
    "/home/:page*",
    "/profile/:page*",
    "/mentors/:page*",
    "/programs/:page*",
    "/volunteers/:page*",
    "/students/:page*",
    "/user-proifle/:page*",
    "/api/families/:page*",
    "/api/parents/:page*",
    "/api/programs/:page*",
    "/api/students/:page*",
    "/api/users/:page*",
  ],
};
