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
    // const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [booklist, setBookList] = useState([]);
    const [modal, setModal] = useState(false);
    const [book, setBook] = useState({});
    const [categorylist, setCategoryList] = useState([]);
    const [authorslist, setAutorsList] = useState([]);

    useEffect(() => {
        (async function () {
            try {
                let response = await axios.get(
                    "http://localhost:5000/category"
                );
                setIsLoaded(true);
                setCategoryList(response.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    useEffect(() => {
        (async function () {
            try {
                let response = await axios.get("http://localhost:5000/author");
                setIsLoaded(true);
                setAutorsList(response.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

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

    const changeBook = (e) => {
        const { name, value } = e.target;
        setBook((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const deleteBook = async (bookID) => {
        try {
            setBookList(booklist.filter((book) => book._id !== bookID));
            await axios.delete(`http://localhost:5000/books/${bookID}`);
        } catch (error) {}
    };

    const updateBook = async (bookID, newbook) => {
        try {
            setBookList(
                booklist.map((book) => {
                    if (book._id === bookID) {
                        book = newbook;
                    }
                    return book;
                })
            );
            await axios.put(`http://localhost:5000/books/${bookID}`, newbook);
        } catch (error) {}
    };

    const addNewBook = async () => {
        try {
            const response = await axios.post(
                "http://localhost:5000/books/new",
                book
            );
            setBookList([...booklist, response.data.book]);
        } catch (error) {}
    };
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
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add Category</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Input
                            text
                            value={book.name}
                            onChange={changeBook}
                            placeholder="Book name"
                            name="name"
                        />
                        <Input
                            type="select"
                            id="exampleSelect"
                            value={book.category}
                            onChange={changeBook}
                            name="category"
                        >
                            {categorylist.map((category) => {
                                return (
                                    <option value={category._id}>
                                        {category.name}
                                    </option>
                                );
                            })}
                        </Input>

                        <Input
                            type="select"
                            id="exampleSelect"
                            value={book.author}
                            onChange={changeBook}
                            name="author"
                        >
                            {authorslist.map((author) => {
                                return (
                                    <option value={author._id}>
                                        {author.firstName} {author.lastName}
                                    </option>
                                );
                            })}
                        </Input>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => {
                            addNewBook();
                            toggle();
                        }}
                    >
                        Add
                    </Button>{" "}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </Container>
    );
};

export default BookList;