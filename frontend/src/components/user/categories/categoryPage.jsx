import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "reactstrap";
import { useParams } from "react-router-dom";


const CategoryPage = (props) => {

<<<<<<< HEAD
    componentDidMount() {
        axios
            .get("http://localhost:5000/books")
            .then((result) => this.setState({ booklist: result.data }));
    }

    render() {
        let catId = this.props.match.params.catId;
        console.log(catId);

        return (
            <Container>
                {this.state.booklist.map((book) => {
                    if (book.category._id === catId) {
                        return <h1>{book.name}</h1>;
=======
    const catId = useParams()['catId'];
    const [booklist, setBookList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        (async function () {
            try {
                let response = await axios.get("http://localhost:5000/books", {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
>>>>>>> 9cd6842b4b53065bd6b5b883daca0c9981d43aa7
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
