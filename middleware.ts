import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "de", "hr", "it"],

  defaultLocale: "hr",
});

export const config = {
  matcher: ["/", "/(de|en|hr|it)/:path*"],
};
