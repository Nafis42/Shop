import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    // If user is not authenticated, redirect to login (but do not log them out)
    if (!isAuthenticated || user?.role !== "admin") {
        // alert("Only admins can access this page!");
        return <Navigate to="/" replace />;
        
    }

    // if (user?.role !== "admin") {
    //     alert("Only admins can access this page!");
    //     return <Navigate to="/" replace />;
        
    // }

    // If user is an admin, allow access
    return <Outlet />;
};

export default AdminRoute;
