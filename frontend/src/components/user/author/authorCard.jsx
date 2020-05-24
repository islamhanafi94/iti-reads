import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import {
    Card, CardBody, CardImg, CardTitle,
    Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';


const AuthorCard = ({ author}) => {

    const handleClick = () => {
        
    }
    return (
        <div>
            <Card width="318px" height="180px">
                <CardImg top width="318px" height="180px" src="https://source.unsplash.com/random" alt="Author Image" />
                <CardBody>
                    <CardTitle>{author.firstName + " " + author.lastName}</CardTitle>
                    {/* <Button color="primary" onClick={handleClick} href={`authors/${author._id}`}> View</Button> */}
                    <Link className="nav-link btn btn-primary" to={ `authors/${author._id}` }>View</Link>
                </CardBody>
            </Card>
        </div>
    );

};

export default AuthorCard;