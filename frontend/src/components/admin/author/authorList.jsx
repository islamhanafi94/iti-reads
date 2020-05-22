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
        } catch (error) {}
    };

    const updateAuthor = async (authorID, name) => {
        try {
            setAuthorList(
                authorlist.map((author) => {
                    if (author._id === authorID) {
                        author.name = name;
                    }
                    return author;
                })
            );
            await axios.put(`http://localhost:5000/author/${authorID}`, {
                name,
            });
        } catch (error) {}
    };

    // const addNewauthor = async () => {
    //     try {
    //         const response = await axios.post(
    //             "http://localhost:5000/author/new",
    //             { name: categoryName }
    //         );
    //         setAuthorList([...categorylist, response.data.category]);
    //     } catch (error) {}
    // };
    return (
        <Container>
            <Container>
                <Row>
                    <Col>
                        <h1>Authors List</h1>
                    </Col>
                    <Button color="primary" size="lg" onClick={toggle}>
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
                    {authorlist.map((author, index) => {
                        return (
                            <AuthorItem
                                key={index}
                                index={index}
                                author={author}
                                updateAuthor={updateAuthor}
                                deleteAuthor={deleteAuthor}
                            />
                        );
                    })}
                </tbody>
            </Table>
            {/* <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add Category</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Input
                            text
                            value={categoryName}
                            onChange={(e) => {
                                setCategoryName(e.target.value);
                            }}
                            placeholder="Category name"
                        />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => {
                            addNewCategory();
                            toggle();
                        }}
                    >
                        Add
                    </Button>{" "}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal> */}
        </Container>
    );
};

export default AuthorList;
