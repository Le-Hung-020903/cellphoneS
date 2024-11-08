import { NextResponse } from "next/server";
export const middleware = async (request) => {
  // kiểm tra login và register
  const pathName = request.nextUrl.pathname;
  const accessToken = request.cookies.get("accessToken")?.value;
  if (
    accessToken &&
    (pathName === "/auth/login" || pathName === "/auth/register")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathName.startsWith("/admin")) {
    // kiểm tra quyền vào admin khi không có đăng nhập
    if (!accessToken) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    // Gọi api để kiểm tra các quyền
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      const permissions = data?.data?.permissions || [];
      const isAdmin = data?.data?.permissions?.includes("admin.manage");
      if (!isAdmin) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      // check quyền xem sản phẩm
      if (
        pathName === "/admin/products" &&
        !permissions.includes("products.read")
      ) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      // check quyền thêm sản phẩm
      if (
        pathName === "/admin/products/createProduct" &&
        !permissions.includes("products.insert")
      ) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      // check quyền sửa sản phẩm
      const productEditRegex = /^\/admin\/products\/\d+$/;
      if (
        productEditRegex.test(pathName) &&
        !permissions.includes("products.update")
      ) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      // check quyền lấy roles
      if (pathName === "/admin/roles" && !permissions.includes("roles.read")) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      // check quyền thêm roles
      if (
        pathName === "/admin/roles/createRole" &&
        !permissions.includes("roles.insert")
      ) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      //check quyền sửa roles
      const roleEditRegex = /^\/admin\/roles\/\d+$/;
      if (
        roleEditRegex.test(pathName) &&
        !permissions.includes("roles.update")
      ) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      // check quyền get user
      if (pathName === "/admin/users" && !permissions.includes("users.read")) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      // check quyền get category
      if (
        pathName === "/admin/categories" &&
        !permissions.includes("categories.read")
      ) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      // check quyền get discount
      if (
        pathName === "/admin/discount" &&
        !permissions.includes("discounts.read")
      ) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    } catch (e) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
};
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
