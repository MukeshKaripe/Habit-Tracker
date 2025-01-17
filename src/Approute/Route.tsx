import React, { ReactNode, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, useLocation } from "react-router-dom";
import Login from '../auth/Login'
import AddHabbit from '../ecommerce/components/Addhabbit';
import Signin from '../auth/Signin';
import Slecteduse from '../ecommerce/components/Selecteduse';

interface PrivateRouteProps {
    children: ReactNode;
    isAuthenticated: boolean;
}

const AppRoute = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();
    const ProtectedRoute = ({ children, isAuthenticated }: PrivateRouteProps) => {
        const isUserAuthenticated = localStorage.getItem("loginS") === "true";
        if (!isUserAuthenticated) {
            setIsAuthenticated(false);
            return ( <Navigate to='/login' replace /> );
        }
        return <>{children}</> 
    }
    useEffect(() => {
        if (location.pathname === "/login") {
            setIsAuthenticated(false);
            localStorage.removeItem('loginS')
        }
     
    }, [location]);
    useEffect(() => {
        const safeRoute = localStorage.getItem('loginS')
        if (safeRoute === "true") {
            setIsAuthenticated(true)
        }
        return () => {
            
        };
    }, []);

    return (
            <Routes>

                {/* Public Routes */}
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

                {/* Protected Routes */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated} >
                            <AddHabbit />
                            <Slecteduse />
                        </ProtectedRoute>
                    }
                >
                </Route>

                {/* Redirect to login if no route matches */}
                <Route path="/signup" element={<Signin />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>

    )
}
export default AppRoute;