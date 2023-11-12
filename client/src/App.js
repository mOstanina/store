import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import ApplicationRouter from "./compoents/ApplicationRouter";
import NavigationPanel from "./compoents/NavigationPanel";
import {observer} from "mobx-react-lite";
import {Context} from "./index";

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     check().then(data => {
    //         user.setUser(true)
    //         user.setIsAuth(true)
    //     }).finally(() => setLoading(false))
    // }, [])
    //
    // if (loading) {
    //     return <Spinner animation={"grow"}/>
    // }

    return (
    <Router>
        <NavigationPanel />
        <ApplicationRouter />
    </Router>
  );
})

export default App;
