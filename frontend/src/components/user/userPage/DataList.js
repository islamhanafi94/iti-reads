import React from 'react';
// import requireAuth from '../../hocs/requireAuth';
// import axios from '../../axios/logged';
// import { Redirect } from "react-router-dom";
console.log("DATALIST");

const DataList = (props) => {

    const myStyle = {
        padding: "0px",
    }
    const books = props.books;
    

    const handleChangeListing = (e) => {
        window.location.replace(`http://localhost:5000/${e.target.value}`);
    }
  
    

    return (
        <div className='sign section--bg' data-bg='img/section/section.jpg' style={myStyle}>


            <table className="table table-bordered justify-content-center text-center ">
                <thead>
                    <tr className="thead-dark">
                        <th>Cover</th>
                        <th>Name</th>
                        <th>Auther</th>
                        <th>Avg Rate</th>

                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => (
                        
                        <tr key={book._id}>
                            <td className='align-middle text-dark'>
                                <img
                                    class='img-thumbnail rounded table__img'
                                    src="https://picsum.photos/200/300" />
                            </td>
                            <td className='align-middle editable text-dark'>{book.name}</td>
                            <td className='align-middle text-dark' >{book.author.firstName} {book.author.lastName}</td>
                            <td className='align-middle text-dark' >
                                {book.avgRate ? book.book.avgRate : 0}
                            </td>


                        </tr>
                    )
                    )}
                </tbody>

            </table>


        </div>
    );
};

export default DataList;