import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListBooks from '../../common/booksList';

const BooksMenu = (props) => {

    const [booksList, setBooksList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        (async function () {
            try {
                let response = await axios.get("http://localhost:5000/books", {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            });
                setBooksList(response.data);
                setIsLoaded(true);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <ListBooks booksList={ booksList }/>
    );

};

export default BooksMenu;