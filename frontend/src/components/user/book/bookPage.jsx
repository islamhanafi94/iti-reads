import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
    ListGroup,
    ListGroupItem,
    Badge,
    CardHeader,
} from "reactstrap";
import StarRatingComponent from "react-star-rating-component";
import AddReview from "../review/addReview";
import DeleteReview from "../review/deleteReview";
import Shelves from "../userPage/changeShelf";
import { useParams, Route, Redirect, Link, withRouter } from 'react-router-dom';
const BookPage = (props) => {
    const { bookId } = useParams();
    const [book, setBook] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [rating, setRating] = useState(0);
    const [userBook, setUserBook] = useState({ myRate: 0, shelf: "to-read" });

    const onStarClick = async (nextValue) => {
        let temp = { ...userBook };
        temp.myRate = nextValue;
        setUserBook(temp);
        console.log(rating, nextValue);

        try {
            await axios.patch(
                "http://localhost:5000/users/mybooks/add",
                { bookID: bookId, fieldName: "myRate", fieldValue: nextValue },
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    const handleShelfChange = async (newShelf, ID) => {
        try {
            await axios.patch('http://localhost:5000/users/mybooks/add',
                { bookID: ID, fieldName: "shelf", fieldValue: newShelf },
                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    }

                });
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        (async function () {
            try {
                let response = await axios
                    .get(`http://localhost:5000/books/${bookId}`, {
                        headers: {
                            Authorization:
                                "Bearer " + localStorage.getItem("token"),
                        },
                    })
                    .then((response) => {
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

    useEffect(() => {
        (async function () {
            try {
                const res = await axios.get(`http://localhost:5000/users/mybooks/${bookId}`,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + localStorage.getItem("token"),
                        },
                    });
                if (Object.keys(res.data).length !== 0) {
                    setUserBook(res.data[0]);
                }
            }
            catch (erorr) {
                console.log(erorr);

            }

        })();
    }, []);

    const getAuthor = () => {
        if (isLoaded) {
            return book.author;
        } else return {};
    };

    const getCategory = () => {
        if (isLoaded) {
            return book.category;
        } else return {};
    };

    const getReviews = () => {
        let reviewsList = [];
        if (isLoaded) {
            reviewsList = book.reviews.map((item) => {
                return item;
            });
            return reviewsList;
        } else return [];
    };

    // console.log(userBook);
    return (
        <div className="container">

            {/* <Card> */}
            <CardImg
                top
                width="100%"
                src="https://source.unsplash.com/random"
                alt="book image"
                width="300px"
                height="180px"
            />


            <CardBody>
                <CardTitle>Book Name : {book.name}</CardTitle>
                <CardText>
                    {" "}
                    Author :{" "}
                    <Link to={`/authors/${getAuthor()._id}`}>
                        {" "}
                        {getAuthor().firstName}
                    </Link>
                </CardText>
                <CardText>
                    Category :
                    <Link to={`/categories/${getCategory()._id}`}>
                        {getCategory().name}
                    </Link>
                </CardText>
                <CardText>Average Rating :</CardText>
                <StarRatingComponent
                    name="avgRate"
                    editing={false}
                    starCount={5}
                    value={book.averageRating}
                />
                {JSON.parse(sessionStorage.getItem("loggedIn")) == true ?

                    <div>
                        <CardText>My Rating :</CardText>
                        <StarRatingComponent
                            name="myRate"
                            starCount={5}
                            value={userBook.myRate}
                            onStarClick={onStarClick}
                        />

                        <Shelves
                            currentItemID={book._id}
                            currentShelf={userBook.shelf}
                            handleShelfChange={handleShelfChange}
                        />
                    </div> : null

                }

                <br />
                {JSON.parse(sessionStorage.getItem("loggedIn")) == true ? (
                    <AddReview />
                ) : null}

                {/* <br /> */}
                <hr />
                <ListGroup>
                    <ListGroupItem color="info">Reviews</ListGroupItem>
                    {getReviews().map((item) => {
                        return (
                            <ListGroupItem>
                                {/* <Badge>{ item.user.username }</Badge>{ " : " + item.review } */}
                                <Card>
                                    <CardHeader>
                                        <h3>{item.user.username}</h3>
                                        {/* <h3>{ item.user.username }</h3> */}
                                    </CardHeader>
                                    <CardBody>
                                        <CardText>{item.review}</CardText>
                                        {JSON.parse(sessionStorage.getItem("loggedIn")) == true && JSON.parse(sessionStorage.getItem("user")).username === item.user.username ? <DeleteReview reviewId={item._id} /> : null}
                                    </CardBody>
                                </Card>
                            </ListGroupItem>
                        );
                    })}
                </ListGroup>
            </CardBody>
            {/* </Card> */}
        </div>
    );
};

export default BookPage;
