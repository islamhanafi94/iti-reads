import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Card, CardBody, CardImg, CardTitle,
    Button,
    Container,
} from 'reactstrap';
import { useParams } from "react-router-dom";

const AuthorPage = (props) => {
    const authorId = useParams()['authorId'];
    const [author, setAuthor] = useState({});
    const [booksList, setBooksList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        (async function () {
            try {
                let response = await axios.get("http://localhost:5000/books/all", {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            });
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
                let response = await axios.get(`http://localhost:5000/author/${authorId}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            });
                setIsLoaded(true);
                setAuthor(response.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);


    console.log(authorId);
    console.log(author);
    return (
        <Container>
            <h1>{author.firstName}</h1>
        </Container>
    );
};

export default AuthorPage;