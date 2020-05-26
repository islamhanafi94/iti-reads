import React, { useState, useEffect } from "react";
import { Container, ListGroup, ListGroupItem, Col, Row } from "reactstrap";
import Pagination from "../../common/pagination";
import axios from "axios";
import { paginate } from "../../../utils/paginate";

const Categories = (props) => {
    // const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [categorylist, setCategoryList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setpageSize] = useState(5);

    useEffect(() => {
        (async function () {
            try {
                let response = await axios.get(
                    "http://localhost:5000/category", {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    }
                });
                setIsLoaded(true);
                setCategoryList(response.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const paginatedCategoryList = paginate(categorylist, currentPage, pageSize);

    return (
        <Container>
            <Container>
                <Row>
                    <Col>
                        <h1>Categories List</h1>
                    </Col>
                </Row>
            </Container>

            <ListGroup>
                { paginatedCategoryList.map((category) => {
                    return (
                        <ListGroupItem tag="a" href={ `categories/${category._id}` }>
                            { category.name }
                        </ListGroupItem>
                    );
                }) }
            </ListGroup>

            <Pagination
                pageSize={ pageSize }
                itemsCount={ categorylist.length }
                currentPage={ currentPage }
                onPageChange={ handlePageChange }
            />
        </Container>
    );
};

export default Categories;
