import React, {useState} from "react";
import {Button, Container} from "react-bootstrap";
import AddProductModal from "../compoents/AddProductModal";

const AdminPanel = () => {
    const [modalVisible, setModalVisible] = useState(false)

    return (
        <Container className="d-flex flex-column" style={{width: "600px"}}>

            <Button
                className="mt-4 p-2"
                onClick={() => setModalVisible(true)}
            >
                Добавить товар
            </Button>
            <AddProductModal isShow={modalVisible} cbClose={() => setModalVisible(false)}/>
        </Container>
    );
};

export default AdminPanel;