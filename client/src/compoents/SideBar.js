import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

const categories = [
    {
        name: "Белорусская литература",
        category: "a",
    },
    {
        name: "Русская литература",
        category: "b",
    },
]

const SideBar =
        (props) => {
    return (
        <ListGroup>
            {categories.map((element, index) =>
                <ListGroup.Item
                    key={index}
                    variant="light"
                    style={{cursor: "pointer"}}
                    active={props.selectedCategory === element.category}
                    onClick={() => props.cbSetCategory(element.category)}
                >
                    {element.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
};


export default SideBar;