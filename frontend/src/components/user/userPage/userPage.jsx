import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookTable from './bookTable';
import ShelvesList from './shelvesList';
import Pagination from '../../common/pagination';

// BookTable -> users Books list , handler for changing shelve 
const UserPage = (props) => {
    const shelves = [{ id: 0, name: "All" }, { id: 1, name: "to-read" }, { id: 2, name: "reading" }, { id: 3, name: "done" }];
    const [selectedShelf, setSelectedShelf] = useState({ id: 1, name: "to-read" });
    const [booksList, setBooksList] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const { data: mybooks } = await axios.get('http://localhost:5000/users/mybooks',
                    {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem("token")
                        }
                    });
                setBooksList(mybooks);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [])


    const handleShelves = (item) => {
        if (!item) setSelectedShelf('');
        setSelectedShelf(item);
    }

    const filterdBooks = selectedShelf.id !== 0 ? booksList.filter((item) => item.shelf === selectedShelf.name) : booksList;

    return (
        <div className="row">
            <div className="col-2">
                <ShelvesList
                    selectedShelf={selectedShelf}
                    items={shelves}
                    textProperty="name"
                    valueProperty="id"
                    onItemSelect={handleShelves}
                />

            </div>
            <div className="col">
                <BookTable booksList={filterdBooks} selectedShelf={selectedShelf.name} />
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
