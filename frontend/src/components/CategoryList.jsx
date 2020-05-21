import React, { useState, useEffect } from 'react';
import { Table, Container } from 'reactstrap';

const CategoryList = (props) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [categorylist, setCategoryList] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/category")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setCategoryList(result);
                    console.log(result);

                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    return (
        <Container>
            <h1>Categories List</h1>
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
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{category.name}</td>
                                <td>{category.name}</td>
                            </tr>

                        )
                    })}
                </tbody>
            </Table>
        </Container>
    );
}


export default CategoryList;
