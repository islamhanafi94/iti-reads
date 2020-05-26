import React, { useState } from 'react';
import axios from 'axios';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { useParams } from 'react-router-dom';

const AddReview = (props) => {
    const [review, setReview] = useState('');
    const { bookId } = useParams();

    const hanleReviewChange = (e) => {
        const { target: { value } } = e;
        setReview(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios({
            method: 'post',
            url: `http://localhost:5000/review/${bookId}`,
            data: {
                review,
                user: JSON.parse(sessionStorage.getItem("user"))
            },
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            window.location.href = `http://localhost:3000/books/${bookId}`;
        }, (error) => {
            console.log(error);
        });

        setReview('');
    }
    return (
        <Form>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="text" name="Review" id="Review" placeholder="add a review" value={review} onChange={hanleReviewChange} />
            </FormGroup>
            <Button onClick={handleSubmit}>Add Review</Button>
        </Form>
    );
}

export default AddReview;