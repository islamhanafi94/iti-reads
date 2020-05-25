import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { useParams, Link } from 'react-router-dom';



const Login = (props) => {
    const { bookId } = useParams();
    const [book, setBook] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
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
    // console.log("book out :", book);
    return (
        <div className="container">
            <Card>
                <CardImg top width="100%" src="https://source.unsplash.com/random" alt="book image" width="300px" height="180px" />
                <CardBody>
                    <CardTitle>Book Name : {book.name}</CardTitle>
                    <CardText> Author : <Link to={`/authors/${getAuthor()._id}`}> {getAuthor().firstName}</Link></CardText>

                    <CardText>Category :<Link to={`/categories/${getCategory()._id}`}>{getCategory().name}</Link></CardText>
                    <CardText>Average Rating : {book.averageRating}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

export default Login;