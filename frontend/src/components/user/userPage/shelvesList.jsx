import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

const ShelvesList = (props) => {
    const { items, valueProperty, textProperty, selectedShelf, onItemSelect } = props
    return (
        <ListGroup style={{ paddingTop: 30 }}>
            {items.map((item) => {
                return (
                    <ListGroupItem
                        className={item.id === selectedShelf.id ? "active" : ""}
                        tag="button"
                        action
                        key={item[valueProperty]}
                        onClick={() => { onItemSelect(item) }}
                    >{item[textProperty]}</ListGroupItem>
                )
            })}
        </ListGroup >
    )
}

export default ShelvesList;
