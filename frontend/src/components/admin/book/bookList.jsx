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
import BookItem from "./bookItem";
const BookList = (props) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [booklist, setBookList] = useState([]);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        (async function () {
            try {
                let response = await axios.get("http://localhost:5000/books");
                setIsLoaded(true);
                setBookList(response.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const toggle = () => setModal(!modal);

    const deleteBook = async (bookID) => {
        try {
            setBookList(booklist.filter((book) => book._id != bookID));
            const res = await axios.delete(
                `http://localhost:5000/books/${bookID}`
            );
        } catch (error) {}
    };

    const updateBook = async (bookID, name) => {
        try {
            setBookList(
                booklist.map((book) => {
                    if (book._id === bookID) {
                        book.name = name;
                    }
                    return book;
                })
            );
            await axios.put(`http://localhost:5000/books/${bookID}`, {
                name,
            });
        } catch (error) {}
    };

    // const addNewBook = async () => {
    //     try {
    //         const response = await axios.post(
    //             "http://localhost:5000/books/new",
    //             { name: categoryName }
    //         );
    //         setBookList([...categorylist, response.data.category]);
    //     } catch (error) {}
    // };
    return (
        <Container>
            <Container>
                <Row>
                    <Col>
                        <h1>Books List</h1>
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
                        <th>Name</th>
                        <th>Category</th>
                        <th>Author</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {booklist.map((book, index) => {
                        return (
                            <BookItem
                                key={index}
                                index={index}
                                book={book}
                                updateBook={updateBook}
                                deleteBook={deleteBook}
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

export default BookList;
