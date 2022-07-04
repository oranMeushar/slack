import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';




const PrivateRoute = ({children, ...rest}) => {

    const user = useSelector(state => state.auth.user);
    return (
        user?.token ? children : <Navigate to='/register' />
    );
    return children;
};

export default PrivateRoute;