import React, {
    useContext,
    useState} from "react";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {NavLink, useLocation} from "react-router-dom";
import {Button, Card, Container, Form} from "react-bootstrap";
import {REGISTRATION_ROUTE, AUTHORIZATION_ROUTE, ONLINE_STORE_ROUTE} from "../utils/constants";
import {logIn, registration} from "../api/userApi"
import {Context} from "../index";


const Authorization = observer(() => {
    const navigate = useNavigate();
    const {user} = useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === AUTHORIZATION_ROUTE
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await logIn(login, password);
            } else {
                data = await registration(login, password);
            }
            if (data){
                user.setUser(user)
                user.setIsAuth(true)
                navigate(ONLINE_STORE_ROUTE)
            }
        } catch (e) {
            alert(e)
        }
    }

    return (
        <Card className="text-center">
            <Card.Header>{isLogin ? "Авторизация" : "Регистрация"}</Card.Header>
            <Card.Body>
                <Container
                    className="d-flex justify-content-center align-items-center flex-column"
                >
                    <Form className="d-flex flex-column" >
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите логин"
                            value={login}
                            onChange={e => setLogin(e.target.value)}
                        />
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите пароль"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                        />
                    </Form>
                    <Button
                        variant="primary"
                        className="mt-3"
                        onClick={click}
                    >
                        {isLogin ? "Войти" : "Зарегистрироваться"}
                    </Button>
                </Container>
            </Card.Body>
            <Card.Footer className="text-muted">
                {isLogin ?
                    <div>
                        Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрироваться</NavLink>
                    </div>
                    :
                    <div>
                        Есть аккаунт? <NavLink to={AUTHORIZATION_ROUTE}>Войти</NavLink>
                    </div>
                }
            </Card.Footer>
        </Card>
    );
});

export default Authorization;