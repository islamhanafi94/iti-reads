import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { useParams, Link } from 'react-router-dom';

import AddReview from "../review/addReview";

const BookPage = (props) => {
    const { bookId } = useParams();
    const [book, setBook] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        (async function () {
            try {
                let response = await axios.get(`http://localhost:5000/books/${bookId}`, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    }
                }).then((response) => {
                    if (response.status === 200) {
                        setBook(response.data.book);
                        setIsLoaded(true);
                    }

                });

            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    // useEffect(() => {
    //     (async function () {
    //         try {
    //             let response = await axios.get(
    //                 "http://localhost:5000/users/logincheck", {
    //                 headers: {
    //                     'Authorization': 'Bearer ' + localStorage.getItem("token")
    //                 }
    //             }
    //             ).then((response) => {
    //                 if (response.status === 200) {
    //                     setIsLoggedIn(true);
    //                     setIsLoaded(true);
    //                 }
    //             });


    //         } catch (error) {
    //             console.log("error is ...", error);
    //         }
    //     })();
    // }, []);

    const renderAddReview = () => {
        if (isLoaded && isLoggedIn) {
            return (<AddReview />)
        }
        else
            return null;
    }

    const getAuthor = () => {
        if (isLoaded) {
            return book.author;
        }
        else
            return {};
    }

    const getCategory = () => {
        if (isLoaded) {
            return book.category;
        }
        else
            return {};
    }

    return (
        <div className="container">
            <Card>
                <CardImg top width="100%" src="https://source.unsplash.com/random" alt="book image" width="300px" height="180px" />
                <CardBody>
                    <CardTitle>Book Name : {book.name}</CardTitle>
                    <CardText> Author : <Link to={`/authors/${getAuthor()._id}`}> {getAuthor().firstName}</Link></CardText>
                    <CardText>Category :<Link to={`/categories/${getCategory()._id}`}>{getCategory().name}</Link></CardText>
                    <CardText>Average Rating : {book.averageRating}</CardText>
                    {JSON.parse(sessionStorage.getItem("loggedIn")) == true ? <AddReview /> : null}
                    {/* {renderAddReview()} */}
                </CardBody>
            </Card>
        </div>
    );
}

export default BookPage;