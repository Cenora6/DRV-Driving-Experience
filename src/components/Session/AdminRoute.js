import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const AdminRoute = ({ component: RouteComponent, ...rest }) => {
    const {currentUser} = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={routeProps =>

                !!currentUser ? (
                    currentUser.email === "admin@admin.pl" ?
                        <RouteComponent {...routeProps} />
                        :
                        <Redirect to={"/home"} />
                ) : (
                    <Redirect to={"/login"} />
                )
            }
        />
    );
};

export default AdminRoute