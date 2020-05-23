import React from "react";
import axios from "axios";
import { Container } from "reactstrap";


class CategoryPage extends React.Component {
    state = { booklist: [] };

    componentDidMount() {
        axios.get("http://localhost:5000/books").then(result => this.setState({ booklist: result.data }));
    }

    render() {
        let catId = this.props.match.params.catId;
        console.log(catId);

        return (
            <Container>
                {this.state.booklist.map((book) => {
                    if (book.category._id === catId) {
                    return <h1>{book.name}</h1> ;
                    }
                })}
            </Container>
        );
    }
}

export default CategoryPage;
