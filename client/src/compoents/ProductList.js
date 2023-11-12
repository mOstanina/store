import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import Product from "./Product";

const ProductList = observer(() => {
    const {product} = useContext(Context)

    return (
        <Row className="d-flex">
            {product?.product?.map(product =>
                <Product key={product.id} product={product}/>
            )}
        </Row>
    );
});

export default ProductList;