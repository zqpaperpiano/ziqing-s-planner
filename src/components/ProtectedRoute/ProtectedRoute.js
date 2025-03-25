import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/authContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { player } = useContext(AuthContext);

    return(
        player ? <Outlet /> : <Navigate to="logIn" />
    )
}

export default ProtectedRoute;