import React, { useState } from "react";
import { Badge } from "reactstrap";
import BookData from "./bookData";

const BookTable = (props) => {
    const { booksList } = props;

    return (
        // <div style={{ paddingTop: 30 }}>
        <div >
            <h1>
                <Badge color="secondary">{props.selectedShelf}</Badge>
            </h1>
            <table className="table ">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Cover</th>
                        <th scope="col">Title</th>
                        <th scope="col">Author</th>
                        <th scope="col">Avg Rate</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Shelve</th>
                    </tr>
                </thead>
                <tbody>
                    {booksList.map((item, index) => {
                        return (
                        <BookData item={item} key={index} index={index} handleShelfChange={props.handleShelfChange}/>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default BookTable;
