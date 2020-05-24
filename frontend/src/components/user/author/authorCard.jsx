import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import {
    Container,
    Card, CardBody, CardImg, CardTitle,
    Button,
} from 'reactstrap';


const AuthorCard = ({ author, index}) => {

    // const [authorList, setAuthorList] = useState([]);
    // const [isLoaded, setIsLoaded] = useState(false);

    // useEffect(() => {
    //     (async function () {
    //         try {
    //             let response = await axios.get("http://localhost:5000/author"/*, {
    //             headers: {
    //                 'Authorization': 'Bearer ' + localStorage.getItem("token")
    //             }
    //         }*/);
    //             setIsLoaded(true);
    //             setAuthorList(response.data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     })();
    // }, []);

    return (
        <div>
            <Card>
                <CardImg top width="318px" height="180px" src="https://source.unsplash.com/random" alt="Author Image" />
                <CardBody>
                    <CardTitle>{author.firstName + " " + author.lastName}</CardTitle>
                    <Button color="primary">View</Button>
                </CardBody>
            </Card>
        </div>
    );

};

export default AuthorCard;