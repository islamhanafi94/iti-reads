import React, { useState } from "react";
import {
    Button,
    ButtonGroup,
    ButtonToolbar,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Input,
} from "reactstrap";

const AuthorItem = ({ author, index, deleteAuthor, updateAuthor }) => {
    const [modal, setModal] = useState(false);
    const [editedAuthor, setEditedAuthor] = useState(author);
    const toggle = () => setModal(!modal);

    const changeAuthorInput = (e) => {
        const { name, value } = e.target;
        setEditedAuthor((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <tr>
            <th scope="row">{ index + 1 }</th>
            <td> { author.firstName }</td>
            <td> { author.lastName }</td>
            <td> { author.dateOfBirth.split('T')[0] }</td>
            <td>
                <ButtonToolbar>
                    <ButtonGroup>
                        <Button
                            color="warning"
                            onClick={ toggle }
                            className="mr-2"
                        >
                            Edit
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button
                            color="danger"
                            onClick={ () => {
                                deleteAuthor(author._id);
                            } }
                        >
                            Delete
                        </Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </td>

            <Modal isOpen={ modal } toggle={ toggle }>
                <ModalHeader toggle={ toggle }>Edit Author</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Input
                            text
                            name="firstName"
                            value={ editedAuthor.firstName }
                            onChange={ changeAuthorInput }
                            placeholder="First name"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            text
                            name="lastName"
                            value={ editedAuthor.lastName }
                            onChange={ changeAuthorInput }
                            placeholder="Last name"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="date"
                            value={ editedAuthor.dateOfBirth }
                            onChange={ changeAuthorInput }
                            name="dateOfBirth"
                            placeholder="Date of Birth"
                        />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={ () => {
                            updateAuthor(author._id, editedAuthor);
                            toggle();
                        } }
                    >
                        Edit
                    </Button>{ " " }
                    <Button color="secondary" onClick={ toggle }>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </tr>
    );
};

export default AuthorItem;
