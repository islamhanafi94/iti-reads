import React from 'react';
import { Badge } from 'reactstrap';
const BookTable = (props) => {
    const { booksList } = props
    return (
        <div style={{ paddingTop: 30 }}>
            <h1><Badge color="secondary">Current Shelve</Badge></h1>
            <table className="table">
                <thead>
                    <tr>
                        <th >Cover</th>
                        <th >Title</th>
                        <th >Author</th>
                        <th >Avg Rate</th>
                        <th >Rating</th>
                        <th >Shelve</th>
                    </tr>
                </thead>
                <tbody>
                    {booksList.map((book, index) => {
                        return (
                            <tr key={index}>
                                <th >{book.cover}</th>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.avgRate}</td>
                                <td>{book.rating}</td>
                                <td>{book.shelve}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default BookTable;
