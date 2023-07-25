export { default } from "next-auth/middleware"

export const config = { matcher: ["/landlord/:path*", "/tenant/:path*"] }