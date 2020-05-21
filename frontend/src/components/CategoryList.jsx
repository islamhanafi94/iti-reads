import React, { useState, useEffect } from 'react';
import { Table, Container, Button, ButtonGroup } from 'reactstrap';
import axios from 'axios';
import CategoryItem from './categoryItem';
const CategoryList = (props) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [categorylist, setCategoryList] = useState([]);
    useEffect(() => {
        (async function () {
            try {
                let response = await axios.get("http://localhost:5000/category")
                setIsLoaded(true);
                setCategoryList(response.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [])

    const deleteCategory = async (categoryID) => {
        try {
            setCategoryList(categorylist.filter((category) => category._id != categoryID));
            const res = await axios.delete(`http://localhost:5000/category/${categoryID}`);
        } catch (error) {

        }
    }
    return (
        <Container>
            <h1>Categories List</h1>
            <Button >add</Button>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categorylist.map((category, index) => {
                        return (
                            <CategoryItem key={index} index={index} category={category} deleteCategory={deleteCategory} />
                        )
                    })}
                </tbody>
            </Table>
        </Container>
    );
}


export default CategoryList;
