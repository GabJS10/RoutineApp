import { useAuthStore } from "../store/authStore";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
function PrivateRoute() {

    const { isAuth } = useAuthStore();



    return ( <>

        {isAuth ? <Outlet /> : <Navigate to="/login" />}
        
    </> );
}

export default PrivateRoute;