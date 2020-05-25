import React from 'react';
import { Badge } from 'reactstrap';
const BookTable = (props) => {
    const { booksList } = props
    return (
        <div style={{ paddingTop: 30 }}>
            <h1><Badge color="secondary">{props.selectedShelf}</Badge></h1>
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
                    {booksList.map((item, index) => {
                        return (
                            <tr key={index}>
                                <th >{item.book.cover}</th>
                                <td>{item.book.name}</td>
                                <td>{item.book.author.firstName + ' ' + item.book.author.lastName}</td>
                                <td>{item.book.averageRating}</td>
                                <td>{item.myRate}</td>
                                <td>{item.shelf}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default BookTable;
