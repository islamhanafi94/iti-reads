import React, { useState, useEffect } from 'react';
import BookTable from './bookTable';
import ShelvesList from './shelvesList';
import Pagination from '../../common/pagination';

// BookTable -> users Books list , handler for changing shelve 
const UserPage = (props) => {
    const shelves = [{ id: 1, name: "to-read" }, { id: 2, name: "reading" }, { id: 3, name: "done" }];
    const [selectedShelve, setSelectedShelve] = useState();
    const [booksList, setBooksList] = useState([
        { id: 1, title: "book1", cover: "cover", author: "author", avgRate: 3, rating: 0, shelve: "to-read" },
        { id: 2, title: "book1", cover: "cover", author: "author", avgRate: 3, rating: 0, shelve: "done" },
        { id: 3, title: "book1", cover: "cover", author: "author", avgRate: 3, rating: 0, shelve: "done" },
        { id: 4, title: "book1", cover: "cover", author: "author", avgRate: 3, rating: 0, shelve: "done" },
        { id: 5, title: "book1", cover: "cover", author: "author", avgRate: 3, rating: 0, shelve: "to-read" },
        { id: 6, title: "book1", cover: "cover", author: "author", avgRate: 3, rating: 0, shelve: "reading" },
        { id: 7, title: "book1", cover: "cover", author: "author", avgRate: 3, rating: 0, shelve: "reading" },
        { id: 8, title: "book1", cover: "cover", author: "author", avgRate: 3, rating: 0, shelve: "reading" },
        { id: 9, title: "book1", cover: "cover", author: "author", avgRate: 3, rating: 0, shelve: "to-read" },
    ]);

    const handleShelves = (shelve) => {
        const books = booksList.filter((book) => book.shelve === shelve.name);
        setBooksList(books)
        // console.log(books);
    }

    // setBooksList()
    // useEffect
    return (
        <div className="row">
            <div className="col-2">
                <ShelvesList
                    selectedShelve={selectedShelve}
                    items={shelves}
                    textProperty="name"
                    valueProperty="id"
                    onItemSelect={handleShelves}

                />

            </div>
            <div className="col">
                <BookTable booksList={booksList} />
                {/* <Pagination
                    pageSize={5}
                    itemsCount={20}
                    currentPage={1}
                    onPageChange=""
                /> */}
            </div>
        </div>

    );
}

export default UserPage;
