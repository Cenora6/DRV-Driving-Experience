import React from "react";
import { Route, Redirect } from "react-router-dom";

const AdminRoute = ({ component: RouteComponent, ...rest }) => {

    return (
        <Route
            {...rest}
            render={routeProps =>
                (sessionStorage.getItem("role") === "admin") ? (
                    <RouteComponent {...routeProps} />
                ) : (
                    <Redirect to={"/home"} />
                )
            }
        />
    );
};

export default AdminRoute
