import React, { useState } from "react";
import { Badge } from "reactstrap";
import BookData from "./bookData";

const BookTable = (props) => {
    const { booksList } = props;

    return (
        <div style={{ paddingTop: 30 }}>
            <h1>
                <Badge color="secondary">{props.selectedShelf}</Badge>
            </h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Cover</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Avg Rate</th>
                        <th>Rating</th>
                        <th>Shelve</th>
                    </tr>
                </thead>
                <tbody>
                    {booksList.map((item, index) => {
                        return (
                        <BookData item={item} key={index} index={index}/>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default BookTable;
