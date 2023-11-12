import React, {useContext} from 'react';
import {useNavigate} from 'react-router-dom'
import {Context} from "../index";
import {Container, Nav, Navbar} from "react-bootstrap";
import {ADMIN_PANEL_ROUTE, AUTHORIZATION_ROUTE, ONLINE_STORE_ROUTE} from "../utils/constants";
import {observer} from "mobx-react-lite";

const NavigationPanel = observer(() => {
    const navigate = useNavigate();
    const {user} = useContext(Context)

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.setItem("token", "")
    }

    return (
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand href={ONLINE_STORE_ROUTE}>OnlineStore</Navbar.Brand>
                {user.isAuth ?
                    <Nav className="ml-auto">
                        <Nav.Link
                            variant={"outline-light"}
                            onClick={() => navigate(ADMIN_PANEL_ROUTE)}
                        >
                            Admin Panel
                        </Nav.Link>
                        <Nav.Link
                            variant={"outline-light"}
                            onClick={() => logOut()}
                            // onClick={() => navigate(AUTHORIZATION_ROUTE)}
                            className="ml-2"
                        >
                            Log out
                        </Nav.Link>
                    </Nav>
                    :
                    <Nav className="ml-auto">
                        <Nav.Link variant={"outline-light"}
                                  onClick={() => navigate(AUTHORIZATION_ROUTE)}
                                  // onClick={() => user.setIsAuth(true)}
                        >Login</Nav.Link>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavigationPanel;