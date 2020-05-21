import React, { useState } from 'react';
import {
    Button,
    ButtonGroup,
    Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input
} from 'reactstrap';
import axios from 'axios';

const CategoryItem = ({ category, index, deleteCategory, updateCategory }) => {
    const [modal, setModal] = useState(false);
    const [categoryName, setCategoryName] = useState(category.name);

    const toggle = () => setModal(!modal);

    const changeCategory = (e) => {
        setCategoryName(e.target.value)
    }


    return (
        <tr>
            <th scope="row">{index + 1}</th>
            <td>{category.name}</td>
            <td>
                <ButtonGroup>
                    <Button onClick={toggle} className="mr-2">edit</Button>
                    <Button onClick={() => { deleteCategory(category._id) }}>delete</Button>
                </ButtonGroup>
            </td>

            <Modal isOpen={modal} toggle={toggle} className="">
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Input plaintext value={categoryName} onChange={changeCategory} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => { updateCategory(category._id, categoryName); toggle(); }}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </tr>


    )
}


export default CategoryItem;