import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Card,
    CardBody,
    Media,
    Container,
} from "reactstrap";
import { useParams } from "react-router-dom";
import AuthorBookPage from "./authorBook";

const AuthorPage = (props) => {
    const authorId = useParams()["authorId"];
    const [author, setAuthor] = useState({});
    const [booksList, setBooksList] = useState([]);
    const [isauthorLoaded, setIsAuthorLoaded] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        (async function () {
            try {
                let response = await axios.get(
                    "http://localhost:5000/books/all",
                    {
                        headers: {
                            Authorization:
                                "Bearer " + localStorage.getItem("token"),
                        },
                    }
                );
                setIsLoaded(true);
                setBooksList(response.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    useEffect(() => {
        (async function () {
            try {
                let response = await axios.get(
                    `http://localhost:5000/author/${authorId}`,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + localStorage.getItem("token"),
                        },
                    }
                );
                setAuthor(response.data);
                setIsAuthorLoaded(true);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const splitDate = () => {
        if (isauthorLoaded) {
            return author.dateOfBirth.split("T")[0];
        } else return "Loading Date of birth...";
    };

    return (
        <Container>
            <br />
            <Media left>
                <Media
                    object
                    src="https://source.unsplash.com/random/64x64"
                    alt="Book Image"
                />
            </Media>
            <h3>{author.firstName + " " + author.lastName}</h3>
            <h5>{splitDate()}</h5>
            <br />
            <Container>
                <Card>
                    <div className="alert alert-secondary">
                        <h2>{author.firstName}'s Books</h2>
                    </div>
                    <CardBody>
                        {booksList
                            .filter((book) => book.author === author._id)
                            .map((book, index) => {
                                console.log(book);

                                return (
                                    <AuthorBookPage book={book} />
                                );
                            })}
                    </CardBody>
                </Card>
            </Container>
        </Container>
    );
};

export default AuthorPage;
