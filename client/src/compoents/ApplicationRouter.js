import React, {useContext} from "react";
import {Routes, Route, Navigate } from "react-router-dom";
import {privateRoutes, publicRoutes} from "../routes";
import {ONLINE_STORE_ROUTE} from "../utils/constants";
import {Context} from "../index";

const ApplicationRouter = () => {
    const {user} = useContext(Context)
    console.log("user", user)

    return (
        <Routes>
            {user.isAuth && privateRoutes.map(({path, Component}) =>
                <Route key={path} exact path={path} element={Component} />
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} exact path={path} element={Component} />
            )}
            <Route path="*" element={<Navigate replace to={ONLINE_STORE_ROUTE} />} />
        </Routes>
    );
};

export default ApplicationRouter;