import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

const ShelvesList = (props) => {
    const { items, valueProperty, textProperty, selectedShelve, onItemSelect } = props
    return (
        <ListGroup style={{ paddingTop: 30 }}>
            <ListGroupItem tag="button"
                action
                onClick={() => { onItemSelect(); }}
            >All
                </ListGroupItem>
            {items.map((item) => {
                return (
                    <ListGroupItem
                        className={item[valueProperty] === selectedShelve ? "active" : ""}
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
