import React from 'react';
import {
    Card, CardBody, CardImg, CardTitle, CardSubtitle, CardText,
} from 'reactstrap';
import { Link } from 'react-router-dom';


const BookCard = ({ book }) => {

    return (
        <div>
            <Card width="318px" height="180px">
                <CardImg top width="318px" height="180px" src="https://source.unsplash.com/random" alt="Book Image" />
                <CardBody>
                    <CardTitle>{ book.name }</CardTitle>
                    <CardSubtitle>
                        <Link to={ `authors/${book.author._id}` }>{ book.author.firstName + " " + book.author.lastName }</Link>
                    </CardSubtitle>
                    <CardText>{ book.averageRating }</CardText>
                    <Link className="btn btn-primary" to={ `books/${book._id}` }>View</Link>
                </CardBody>
            </Card>
        </div>
    );

};

export default BookCard;