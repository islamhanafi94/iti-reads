import React, { useState, useEffect } from "react";
import {
    Button,
    Table,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Input,
    Col,
    Row,
} from "reactstrap";
import Pagination from '../../common/pagination';
import axios from "axios";
import CategoryItem from "./categoryItem";
import { paginate } from '../../../utils/paginate';

const CategoryList = (props) => {
    // const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [categorylist, setCategoryList] = useState([]);
    const [modal, setModal] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setpageSize] = useState(5);



    useEffect(() => {
        (async function () {
            try {
                let response = await axios.get(
                    "http://localhost:5000/users/admin", {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    }
                }
                );
                console.log(response.data);
            } catch (error) {
                console.log(error);
                if (error.toString().includes("Request failed with status code 401")) {
                    localStorage.setItem("token", "");
                    window.location.href = "http://localhost:3000/admin";
                }
            }
        })();
    }, []);

    useEffect(() => {
        (async function () {
            try {
                let response = await axios.get(
                    "http://localhost:5000/category", {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    }
                }
                );
                setIsLoaded(true);
                setCategoryList(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const toggle = () => setModal(!modal);

    const deleteCategory = async (categoryID) => {
        try {
            setCategoryList(
                categorylist.filter((category) => category._id !== categoryID)
            );
            const res = await axios.delete(
                `http://localhost:5000/category/${categoryID}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }
            );
        } catch (error) { }
    };

    const updateCategory = async (categoryID, name) => {
        try {
            setCategoryList(
                categorylist.map((category) => {
                    if (category._id === categoryID) {
                        category.name = name;
                    }
                    return category;
                })
            );
            await axios.put(`http://localhost:5000/category/${categoryID}`,
                { name }, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }
            );
        } catch (error) { }
    };

    const addNewCategory = async () => {
        try {
            const response = await axios.post(
                "http://localhost:5000/category/new",
                { name: categoryName }, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }
            );
            setCategoryList([...categorylist, response.data.category]);
        } catch (error) { }
    }
    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const paginatedCategoryList = paginate(categorylist, currentPage, pageSize)
    return (
        <Container>
            <Container>
                <Row>
                    <Col>
                        <h1>Categories List</h1>
                    </Col>
                    <Button color="primary" size="lg" onClick={toggle}>
                        Add
                    </Button>
                </Row>
            </Container>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedCategoryList.map((category, index) => {
                        return (
                            <CategoryItem
                                key={index}
                                index={categorylist.indexOf(category)}
                                category={category}
                                updateCategory={updateCategory}
                                deleteCategory={deleteCategory}
                            />
                        );
                    })}
                </tbody>
            </Table>

            <Pagination
                pageSize={pageSize}
                itemsCount={categorylist.length}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />


            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add Category</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Input
                            text
                            value={categoryName}
                            onChange={(e) => {
                                setCategoryName(e.target.value);
                            }}
                            placeholder="Category name"
                        />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => {
                            addNewCategory();
                            toggle();
                        }}
                    >
                        Add
                    </Button>{" "}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </Container>
    );
};

export default CategoryList;
