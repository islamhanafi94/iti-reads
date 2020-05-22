import React, { useState } from 'react';
import {
    Button,
    ButtonGroup, ButtonToolbar,
    Modal, ModalHeader, ModalBody, ModalFooter,
    FormGroup, Input,
} from 'reactstrap';

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
                <ButtonToolbar>
                    <ButtonGroup>
                        <Button color="warning" onClick={toggle} className="mr-2">Edit</Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button color="danger" onClick={() => { deleteCategory(category._id) }}>Delete</Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </td>

            <Modal isOpen={modal} toggle={toggle} className="">
                <ModalHeader toggle={toggle}>Edit Category</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Input plaintext value={categoryName} onChange={changeCategory} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => { updateCategory(category._id, categoryName); toggle(); }}>Edit</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </tr>


    )
}


export default CategoryItem;