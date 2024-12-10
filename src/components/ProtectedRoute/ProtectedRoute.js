import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../config/authContext";
import { Navigate, redirect, Route, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { player } = useContext(AuthContext);

    return(
        player ? <Outlet /> : <Navigate to="signIn" />
    )
}

export default ProtectedRoute;