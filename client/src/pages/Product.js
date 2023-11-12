import React, {
    useEffect,
    useState} from "react";
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {REACT_APP_API_URL} from "../api";
import {useParams} from 'react-router-dom'
import {fetchSingleProduct} from "../api/productApi";

const Product = () => {
    const [product, setProduct] = useState({info: []})
    const {id} = useParams()
    useEffect(() => {
        fetchSingleProduct(id).then(data => setProduct(data))
    }, [])

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={400} src={REACT_APP_API_URL + product.img}/>
                </Col>

                <Col>
                    <h2>{product.name}</h2>
                    <h3>{product.price} руб.</h3>
                    <Button>Добавить в корзину</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Product;