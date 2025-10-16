import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["hr"],

  defaultLocale: "hr",
});

export const config = {
  matcher: ["/", "/(de|en|hr|it)/:path*"],
};
