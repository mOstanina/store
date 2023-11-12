import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import ApplicationRouter from "./compoents/ApplicationRouter";
import NavigationPanel from "./compoents/NavigationPanel";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./api/userApi";

const App = observer(() => {
    const {user} = useContext(Context)

    useEffect(() => {
        const responce = check().then(data => {
            user.setUser(true)
            user.setIsAuth(true)
        })

    }, [])

    return (
    <Router>
        <NavigationPanel />
        <ApplicationRouter />
    </Router>
  );
})

export default App;
