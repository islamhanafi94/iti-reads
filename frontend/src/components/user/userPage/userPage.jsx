import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookTable from './bookTable';
import ShelvesList from './shelvesList';
import Pagination from '../../common/pagination';

// BookTable -> users Books list , handler for changing shelve 
const UserPage = (props) => {
    const shelves = [{ id: 1, name: "to-read" }, { id: 2, name: "reading" }, { id: 3, name: "done" }];
    const [selectedShelve, setSelectedShelve] = useState();
    const [booksList, setBooksList] = useState([]);

    let allBooks = []
    useEffect(() => {
        (async () => {
            try {
                const { data: mybooks } = await axios.get('http://localhost:5000/users/mybooks',
                    {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem("token")
                        }
                    });
                allBooks = [...mybooks];
                console.log(allBooks, mybooks);
                setBooksList(mybooks);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [])


    const handleShelves = (s) => {
        setBooksList(allBooks)
        const books = booksList.filter((item) => item.shelf === s.name);
        console.log(books);
        setBooksList(books)
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
