import React, {useContext, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createDevice} from "../api/productApi";

const AddProductModal = ({isShow, cbClose}) => {
    const [name, setName] = useState("");
    const [weight, setWeight] = useState(0);
    const [size, setSize] = useState("");
    const [idManufacturer, setIdManufacturer] = useState(0);
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);
    const [description, setDecription] = useState("");
    const [count, setCount] = useState(0);

    const addProduct = () => {
        let formData = new FormData();
        formData.append("name", name);
        formData.append("weight", weight);
        formData.append("size", size);
        formData.append("idManufacturer", idManufacturer);
        formData.append("category", category);
        formData.append("price", `${price}`);
        formData.append("file", file);
        formData.append("description", description);
        formData.append("count", count);
        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }
        createDevice(formData).then(() => cbClose());
    }

    const selectFile = e => {
        console.log("e.target.files[0]", e.target.files[0])
        setFile(e.target.files[0])
    }

    return (
        <Modal show={isShow} onHide={cbClose}>
            <Modal.Header closeButton>
                <Modal.Title>Добавление товара</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label className="mt-3">Введите название товара</Form.Label>
                        <Form.Control
                            value={name}
                            type="text"
                            placeholder="название"
                            onChange={e => setName(e.target.value)}
                        />

                        <Form.Label className="mt-3">Введите вес товара</Form.Label>
                        <Form.Control
                            value={weight}
                            type="number"
                            placeholder="вес"
                            onChange={e => setWeight(Number(e.target.value))}
                        />
                        <Form.Label className="mt-3">Введите размер товара</Form.Label>
                        <Form.Control
                            value={size}
                            type="text"
                            placeholder="размер"
                            onChange={e => setSize(e.target.value)}
                        />
                        <Form.Label className="mt-3">Введите производителя товара</Form.Label>
                        <Form.Control
                            value={idManufacturer}
                            type="number"
                            placeholder="производитель"
                            onChange={e => setIdManufacturer(Number(e.target.value))}
                        />
                        <Form.Label className="mt-3">Введите категорию товара</Form.Label>
                        <Form.Control
                            value={category}
                            type="text"
                            placeholder="категория"
                            onChange={e => setCategory(e.target.value)}
                        />
                        <Form.Label className="mt-3">Введите цену товара</Form.Label>
                        <Form.Control
                            value={price}
                            type="number"
                            placeholder="цена"
                            onChange={e => setPrice(Number(e.target.value))}
                        />
                        <Form.Label className="mt-3">Введите количество товара на складе</Form.Label>
                        <Form.Control
                            value={count}
                            type="number"
                            placeholder="количество"
                            onChange={e => setCount(Number(e.target.value))}
                        />
                        <Form.Control
                            className="mt-3"
                            type="file"
                            onChange={selectFile}
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Описание товара</Form.Label>
                        <Form.Control
                            value={description}
                            as="textarea"
                            rows={3}
                            onChange={e => setDecription(e.target.value)}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={cbClose}>
                    Закрыть
                </Button>
                <Button variant="primary" onClick={addProduct} >
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddProductModal;