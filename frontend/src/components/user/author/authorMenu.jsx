import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthorCard from './authorCard';
import { Container, CardDeck } from 'reactstrap';


const AuthorsMenu = (props) => {

    const [authorList, setAuthorList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        (async function () {
            try {
                let response = await axios.get("http://localhost:5000/author"/*, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }*/);
                setIsLoaded(true);
                setAuthorList(response.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <Container>
            {
                authorList.map((author, index) => {
                    return (
                        <CardDeck>
                            <AuthorCard
                                key={ index }
                                // index={ index }
                                author={ author }
                            />
                        </CardDeck>
                    );
                })
            }
        </Container>
    );

};

export default AuthorsMenu;