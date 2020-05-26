import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookTable from './bookTable';
import ShelvesList from './shelvesList';
import Pagination from '../../common/pagination';

// BookTable -> users Books list , handler for changing shelve 
const UserPage = (props) => {
    const shelves = [{ id: 0, name: "All" }, { id: 1, name: "to-read" }, { id: 2, name: "reading" }, { id: 3, name: "done" }];
    const [selectedShelf, setSelectedShelf] = useState({ id: 0, name: "All" });
    const [booksList, setBooksList] = useState([]);
    const [ isLoaded, setISLoaded ] = useState([]);

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
    }, [selectedShelf])


    const handleShelves = (item) => {
        if (!item) setSelectedShelf('');
        setSelectedShelf(item);
    }

    const handleShelfChange = async (newShelf, ID) => {
        try {
            await axios.patch('http://localhost:5000/users/mybooks/add',
                { bookID: ID, fieldName: "shelf", fieldValue: newShelf },
                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    }

                });

            setSelectedShelf({ id: 0, name: "All" })

        } catch (error) {
            console.log(error);

        }
        console.log(newShelf, ID);
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
                <BookTable
                    booksList={filterdBooks}
                    selectedShelf={selectedShelf.name}
                    handleShelfChange={handleShelfChange}
                />
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
