import {REACT_APP_API_URL} from "./index";
import {jwtDecode} from "jwt-decode";

export async function fetchProducts() {
    try {
        const response = await fetch(REACT_APP_API_URL +"api/product", {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
        });

        return await response.json();
    } catch (error) {
        alert(error);
    }
}

export const fetchSingleProduct = async (id) => {
      try {
        const response = await fetch(REACT_APP_API_URL +"api/product/"+ id, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
        });

        return await response.json();
    } catch (error) {
        alert(error);
    }
}

export async function createDevice(product) {
    console.log("createDevice(product)", product)
    try {
        const response = await fetch(REACT_APP_API_URL+"api/product", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(product),
        });
        const data = await response.json();

        if(data.message){
            console.error("data.message", data.message)
            return alert(data.message);
        }
        return data
    } catch (error) {
        alert(error);
    }
}


