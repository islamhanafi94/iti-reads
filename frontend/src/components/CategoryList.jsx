import React, { useState, useEffect } from 'react';
import { Table, Container } from 'reactstrap';
import axios from 'axios';
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
