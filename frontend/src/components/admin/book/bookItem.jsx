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
    Media,
} from "reactstrap";
import ImageUploader from "react-images-upload";
import axios from "axios";

const BookItem = ({ book, index, deleteBook, updateBook }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [modal, setModal] = useState(false);
    const [bookstate, setBook] = useState(book);
    const [categorylist, setCategoryList] = useState([]);
    const [authorslist, setAutorsList] = useState([]);

    var imgStyle = {
        minWidth: "128px",
    };

    useEffect(() => {
        (async function () {
            try {
                let response = await axios.get(
                    "http://localhost:5000/category",
                    {
                        headers: {
                            Authorization:
                                "Bearer " + localStorage.getItem("token"),
                        },
                    }
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
                let response = await axios.get("http://localhost:5000/author", {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                });
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

    const imagepath = `./../../../../backend/public/images/${book.image}`;
    return (
        <tr>
            <th scope="row">{index + 1}</th>
            <td>
                {/* <Media style={imgStyle} object src={imagepath} /> */}
                <img style={imgStyle} src={imagepath}/>
            </td>
            <td>{book.name}</td>
            <td>{book.category}</td>
            <td>{book.author}</td>
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
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="select"
                            id="exampleSelect"
                            value={bookstate.category._id}
                            onChange={changeBook}
                            name="category"
                        >
                            <option disabled>Select Category</option>
                            {categorylist.map((category) => {
                                return (
                                    <option value={category._id}>
                                        {category.name}
                                    </option>
                                );
                            })}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="select"
                            id="exampleSelect"
                            value={bookstate.author._id}
                            onChange={changeBook}
                            name="author"
                        >
                            <option disabled>Select Author</option>
                            {authorslist.map((author) => {
                                return (
                                    <option value={author._id}>
                                        {author.firstName} {author.lastName}
                                    </option>
                                );
                            })}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        
                        {/* <ImageUploader
                            withIcon={true}
                            buttonText="Choose images"
                            value={bookstate.image}
                            onChange={changeBook}
                            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                            maxFileSize={5242880}
                            name="image"
                        /> */}
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
