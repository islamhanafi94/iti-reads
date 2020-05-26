import React, { useState, useEffect } from "react";
import axios from "axios";
import { CardBody, CardTitle, CardText, Media } from "reactstrap";

import StarRatingComponent from "react-star-rating-component";
import Shelves from "../userPage/changeShelf";

const AuthorBookPage = (props) => {
    const { book } = props;
    const [userBook, setUserBook] = useState({ myRate: 0, shelf: "to-read" });

    const onStarClick = async (nextValue) => {
        let temp = { ...userBook };
        temp.myRate = nextValue;
        setUserBook(temp);

        try {
            await axios.patch(
                "http://localhost:5000/users/mybooks/add",
                {
                    bookID: book._id,
                    fieldName: "myRate",
                    fieldValue: nextValue,
                },
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
            await axios.patch(
                "http://localhost:5000/users/mybooks/add",
                { bookID: ID, fieldName: "shelf", fieldValue: newShelf },
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

    useEffect(() => {
        (async function () {
            try {
                const res = await axios.get(
                    `http://localhost:5000/users/mybooks/${book._id}`,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + localStorage.getItem("token"),
                        },
                    }
                );
                if (Object.keys(res.data).length !== 0) {
                    setUserBook(res.data[0]);
                }
            } catch (erorr) {
                console.log(erorr);
            }
        })();
    }, []);

    return (
        <div>
            {/* <div> */}
            <Media left>
                <Media
                    object
                    src="https://source.unsplash.com/random/64x64"
                    alt="Book Image"
                />
            </Media>
            <CardBody>
                <CardTitle h4>{book.name}</CardTitle>
                <CardText> Avg. Rate</CardText>
                <StarRatingComponent
                    name="avgRate"
                    editing={false}
                    starCount={5}
                    value={book.averageRating}
                />
                <br />
                <CardText>My Rate</CardText>
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
            </CardBody>
            {/* </div> */}
            <hr />
        </div>
    );
};

export default AuthorBookPage;
