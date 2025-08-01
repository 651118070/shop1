import { Navigate, useLocation } from "react-router-dom";
function CheckAuth({ isAuthenticated, user, children }) {
    const location = useLocation();
  
  
    // if (location.pathname === "/") {
    //   if (!isAuthenticated) {
    //     return <Navigate to="/auth/signin" />;
    //   } else {
    //     if (user?.role === "admin") {
    //       return <Navigate to="/admin/dashboard" />;
    //     } else {
    //       return <Navigate to="/shop/home" />;
    //     }
    //   }
    // }
    if (location.pathname === "/") {
      return <>{children}</>;
    }
  
    if (
      !isAuthenticated &&
      !(
        location.pathname.includes("/signin") ||
        location.pathname.includes("/signup")
      )
    ) {
      return <Navigate to="/auth/signin" />;
    }
  
    if (
      isAuthenticated &&
      (location.pathname.includes("signin") ||
        location.pathname.includes("/signup"))
    ) {
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/shop/home" />;
      }
    }
  
    if (
      isAuthenticated &&
      user?.role !== "admin" &&
      location.pathname.includes("admin")
    ) {
      return <Navigate to="/unauth-page" />;
    }
  
    if (
      isAuthenticated &&
      user?.role === "admin" &&
      location.pathname.includes("shop")
    ) {
      return <Navigate to="/admin/dashboard" />;
    }
  
    return <>{children}</>;
  }
  
  export default CheckAuth;
  