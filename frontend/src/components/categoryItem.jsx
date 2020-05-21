import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';

const CategoryItem = ({ category, index, deleteCategory }) => {
    return (
        <tr>
            <th scope="row">{index + 1}</th>
            <td>{category.name}</td>
            <td>
                <ButtonGroup>
                    <Button className="mr-2">edit</Button>
                    <Button onClick={() => { deleteCategory(category._id) }}>delete</Button>
                </ButtonGroup>
            </td>
        </tr>


    )
}


export default CategoryItem;