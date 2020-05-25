import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "reactstrap";
import ListBooks from "../../common/booksList";
import { useParams } from "react-router-dom";


const CategoryPage = (props) => {

    const catId = useParams()['catId'];
    const [booklist, setBookList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
        (async function () {
            try {
                let response = await axios.get("http://localhost:5000/books", {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    }
                });
                setBookList(response.data);
                setIsLoaded(true);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    useEffect(() => {
        (async function () {
            try {
                let response = await axios.get(`http://localhost:5000/category/${catId}`, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    }
                });
                setCategoryName(response.data.category.name);
                setIsLoaded(true);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (

        <Container>
            <br />
            <h1>{ categoryName }</h1>
            <ListBooks booksList={ booklist.filter((book) => book.category._id === catId) } />
        </Container>
    );
};

export default CategoryPage;