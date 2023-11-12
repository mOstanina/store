import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import {Routes, Route, Navigate } from "react-router-dom";
import {privateRoutes, publicRoutes} from "../routes";
import {ONLINE_STORE_ROUTE} from "../utils/constants";
import {Context} from "../index";

const ApplicationRouter = observer(() =>  {
    const {user} = useContext(Context)

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
});

export default ApplicationRouter;