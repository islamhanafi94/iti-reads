import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "reactstrap";
import { useParams } from "react-router-dom";


const CategoryPage = (props) => {

    const catId = useParams()['catId'];
    const [booklist, setBookList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        (async function () {
            try {
                let response = await axios.get("http://localhost:5000/books", {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    }
                });
                setIsLoaded(true);
                setBookList(response.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <Container>
            { booklist.map((book) => {
                if (book.category._id === catId) {
                    return <h1>{ book.name }</h1>;
                }
            }) }
        </Container>
    );
};

export default CategoryPage;
