import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import {
    Card, CardBody, CardImg, CardTitle,
    Button,
} from 'reactstrap';


const AuthorCard = ({ author}) => {

    return (
        <div>
            <Card width="318px" height="180px">
                <CardImg top width="318px" height="180px" src="https://source.unsplash.com/random" alt="Author Image" />
                <CardBody>
                    <CardTitle>{author.firstName + " " + author.lastName}</CardTitle>
                    <Button color="primary" href={`authors/${author._id}`} >View</Button>
                </CardBody>
            </Card>
        </div>
    );

};

export default AuthorCard;