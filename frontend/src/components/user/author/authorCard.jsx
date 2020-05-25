import React, { useState, useEffect } from 'react';
import {
    Card, CardBody, CardImg, CardTitle,
    Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';


const AuthorCard = ({ author}) => {

    return (
        <div>
            <Card width="318px" height="180px">
                <CardImg top width="318px" height="180px" src="https://source.unsplash.com/random" alt="Author Image" />
                <CardBody>
                    <CardTitle>{author.firstName + " " + author.lastName}</CardTitle>
                    <Link className="btn btn-primary" to={ `authors/${author._id}` }>View</Link>
                </CardBody>
            </Card>
        </div>
    );

};

export default AuthorCard;