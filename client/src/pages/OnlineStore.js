import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'
import {Container, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import SideBar from "../compoents/SideBar";
import ProductList from "../compoents/ProductList";
import {Context} from "../index";
import {fetchProducts} from "../api/productApi";
import {observer} from "mobx-react-lite";

const OnlineStore = observer(() => {
    const {product} = useContext(Context)
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('')
    const cbSetCategory = (category) =>{
        setSelectedCategory(category)
    }

    useEffect(() => {
        fetchProducts().then(data => {
            product.setProduct(data.rows)
            product.setTotalCount(data.count)
        })
    }, [])

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <SideBar cbSetCategory={cbSetCategory} selectedCategory={selectedCategory}/>
                </Col>
                <Col md={9}>
                    <ProductList />
                </Col>
            </Row>
        </Container>
    );
});

export default OnlineStore;