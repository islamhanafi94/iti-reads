import React, { useState, useEffect } from "react";
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
import ImageUploader from "react-images-upload";
import axios from "axios";

const BookItem = ({ book, index, deleteBook, updateBook }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [modal, setModal] = useState(false);
    const [bookstate, setBook] = useState(book);
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

    const toggle = () => setModal(!modal);

    const changeBook = (e) => {
        const { name, value } = e.target;
        setBook((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // onDrop(picture) {
    //     this.setState({
    //         pictures: this.state.pictures.concat(picture),
    //     });
    // }

    return (
        <tr>
            <th scope="row">{index + 1}</th>
            <td>{book.name}</td>
            <td>{book.category.name}</td>
            <td>
                {book.author.firstName} {book.author.lastName}
            </td>
            <td>
                <ButtonToolbar>
                    <ButtonGroup>
                        <Button
                            color="warning"
                            onClick={toggle}
                            className="mr-2"
                        >
                            Edit
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button
                            color="danger"
                            onClick={() => {
                                deleteBook(book._id);
                            }}
                        >
                            Delete
                        </Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </td>

            <Modal isOpen={modal} toggle={toggle} className="">
                <ModalHeader toggle={toggle}>Edit Category</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Input
                            text
                            value={bookstate.name}
                            onChange={changeBook}
                            name="name"
                        />
                        <Input
                            type="select"
                            id="exampleSelect"
                            value={bookstate.category._id}
                            onChange={changeBook}
                            name="category"
                        >
                            {categorylist.map((category) => {
                                return <option>{category.name}</option>;
                            })}
                        </Input>

                        <Input
                            type="select"
                            id="exampleSelect"
                            value={bookstate.author._id}
                            onChange={changeBook}
                            name="author"
                        >
                            {authorslist.map((author) => {
                                return (
                                    <option>
                                        {author.firstName} {author.lastName}
                                    </option>
                                );
                            })}
                        </Input>
                        <ImageUploader
                            withIcon={true}
                            buttonText="Choose images"
                            // onChange={this.onDrop}
                            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                            maxFileSize={5242880}
                        />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => {
                            updateBook(book._id, bookstate);
                            toggle();
                        }}
                    >
                        Edit
                    </Button>{" "}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </tr>
    );
};

export default BookItem;
