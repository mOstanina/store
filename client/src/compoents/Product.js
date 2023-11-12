import React from "react";
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {useNavigate} from 'react-router-dom'
import {PRODUCT_ROUTE} from "../utils/constants";
import {REACT_APP_API_URL} from "../api";

const Product = ({product}) => {
    const navigate = useNavigate();
    return (
        <Col md={3} className={"mt-3"} onClick={() => navigate(PRODUCT_ROUTE + '/' + product.idProduct)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                <Image width={150} height={200} src={REACT_APP_API_URL + product.img}/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div>...</div>
                </div>
                <div>{product.name}</div>
                <div>{product.price + " BYN"}</div>
            </Card>
        </Col>
    );
};

export default Product;