import React, { useState } from 'react';
import axios from 'axios';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { useParams, Route, Redirect, Link, useHistory } from 'react-router-dom';

const DeleteReview = ({ reviewId }) => {
    const { bookId } = useParams();
    const [redirect, setRedirect] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        axios({
            method: 'delete',
            url: `http://localhost:5000/review/${bookId}`,
            data: {
                reviewId,
                user: JSON.parse(sessionStorage.getItem("user"))
            },
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            window.location.href = `http://localhost:3000/books/${bookId}`;
            setRedirect(true);
        }, (error) => {
            console.log(error);
        });
    }
    console.log("/books/" + bookId);
    return (
        <div>
            {/* {redirect ? <Redirect push to={window.location.pathname} /> : null} */}
            <Form>
                <Button onClick={handleSubmit} color="danger">Delete</Button>
            </Form>
        </div>

    );
}

export default DeleteReview;