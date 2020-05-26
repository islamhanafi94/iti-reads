import React, { useState } from 'react';
import axios from 'axios';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { useParams, Route, Redirect, Link, useHistory } from 'react-router-dom';

const AddReview = (props) => {
    const [review, setReview] = useState('');
    const { bookId } = useParams();
    const [redirect, setRedirect] = useState(false);
    const history = useHistory();
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
            // return <Link to={`/books/${bookId}`} />
            setRedirect(true);
        }, (error) => {
            console.log(error);
        });

        setReview('');
    }
    console.log("/books/" + bookId);
    return (
        <div>
            {/* {redirect ? <Redirect push to={window.location.pathname} /> : null} */}
            <Form>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="text" name="Review" id="Review" placeholder="add a review" value={review} onChange={hanleReviewChange} />
                </FormGroup>
                <Button onClick={handleSubmit}>Add Review</Button>
            </Form>
        </div>

        // <Form>
        //     <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        //         <Input type="text" name="Review" id="Review" placeholder="add a review" value={review} onChange={hanleReviewChange} />
        //     </FormGroup>
        //     <br/>
        //     <Button onClick={handleSubmit}>Add Review</Button>
        // </Form>
    );
}



{/* <Redirect

to={{
    pathname: "/books/5ecacfcf7334d420ee4556f8",
    state: { bookId }
}}
/> */}
export default AddReview;