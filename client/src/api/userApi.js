// import {$authHost, $host} from "./index";
import {REACT_APP_API_URL} from "./index";
import { jwtDecode } from "jwt-decode";

// export const registration = async (email, password) => {
//     const {data} = await $host.post("api/user/registration", {email, password, role: 'ADMIN'})
//     localStorage.setItem("token", data.token)
//     return jwt_decode(data.token)
// }

// export const login = async (email, password) => {
//     const {data} = await $host.post("api/user/login", {email, password})
//     localStorage.setItem("token", data.token)
//     return jwt_decode(data.token)
// }

export async function logIn (login, password) {

    try {
        const response = await fetch(REACT_APP_API_URL+"api/user/login", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({login, password}),
        });
        const data = await response.json();

        if(data.message){
            console.error("data.message", data.message)
            return alert(data.message);
        }
        localStorage.setItem("token", data.token)
        return jwtDecode(data.token)
    } catch (error) {
        alert(error);
    }
}

// export const check = async () => {
//     const {data} = await $authHost.get("api/user/auth" )
//     localStorage.setItem("token", data.token)
//     return jwt_decode(data.token)
// }

export async function registration(login, password) {
    // console.log("registration", login)
    try {
        const response = await fetch(REACT_APP_API_URL+"api/user/registration", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({login, password, role: 'ADMIN'}),
        });

        return await response.json();
    } catch (error) {
        alert(error);
    }
}