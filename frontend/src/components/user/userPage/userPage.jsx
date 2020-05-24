import React from 'react';
import BookTable from './bookTable';
import ShelvesList from './shelvesList';

// BookTable -> users Books list , handler for changing shelve 
const UserPage = (props) => {
    return (
        <div className="row">
            <div className="col-2">
                <ShelvesList />
            </div>
            <div className="col">
                <BookTable />

            </div>
        </div>

    );
}

export default UserPage;
