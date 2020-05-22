import React, { useState, useEffect } from "react";
import {
    Button,
    Table,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Input,
    Col,
    Row,
} from "reactstrap";

import axios from "axios";
import AuthorItem from "./authorItem";

const AuthorList = (props) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [newAuthor, setNewAuthor] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
    });
    const [authorlist, setAuthorList] = useState([]);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        (async function () {
            try {
                let response = await axios.get("http://localhost:5000/author");
                setIsLoaded(true);
                setAuthorList(response.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const toggle = () => setModal(!modal);

    const deleteAuthor = async (authorID) => {
        try {
            setAuthorList(authorlist.filter((author) => author._id != authorID));
            const res = await axios.delete(
                `http://localhost:5000/author/${authorID}`
            );
        } catch (error) { }
    };

    const updateAuthor = async (authorID, editedAuthor) => {
        try {
            setAuthorList(
                authorlist.map((author) => {
                    if (author._id === authorID) {
                        author = editedAuthor;
                    }
                    return author;
                })
            );
            await axios.put(`http://localhost:5000/author/${authorID}`, editedAuthor);
        } catch (error) { }
    };

    const addNewAuthor = async () => {
        try {
            const response = await axios.post(
                "http://localhost:5000/author",
                newAuthor
            );
            console.log(response);
            setAuthorList([...authorlist, response.data]);
        } catch (error) {}
    };


    const changeAuthorInput = (e) => {
        const { name, value } = e.target;
        setNewAuthor((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <Container>
            <Container>
                <Row>
                    <Col>
                        <h1>Authors List</h1>
                    </Col>
                    <Button size="lg" color="primary" onClick={ toggle }>
                        Add
                    </Button>
                </Row>
            </Container>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Birth date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { authorlist.map((author, index) => {
                        return (
                            <AuthorItem
                                key={ index }
                                index={ index }
                                author={ author }
                                updateAuthor={ updateAuthor }
                                deleteAuthor={ deleteAuthor }
                            />
                        );
                    }) }
                </tbody>
            </Table>

            <Modal isOpen={ modal } toggle={ toggle }>
                <ModalHeader toggle={ toggle }>Add Author</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Input
                            text
                            name="firstName"
                            value={ newAuthor.firstName }
                            onChange={changeAuthorInput}
                            placeholder="First name"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            text
                            name="lastName"
                            value={ newAuthor.lastName }
                            onChange={changeAuthorInput}
                            placeholder="Last name"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="date"
                            value={ newAuthor.dateOfBirth }
                            onChange={changeAuthorInput}
                            name="dateOfBirth"
                            placeholder="Date of Birth"
                        />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={ () => {
                            addNewAuthor();
                            toggle();
                        } }
                    >
                        Add
                    </Button>{ " " }
                    <Button color="secondary" onClick={ toggle }>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </Container>
    );
};

export default AuthorList;
