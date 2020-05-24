import React from 'react'
import { Button } from 'reactstrap';

const Logout = (props) => {

    const handleClick = () => {
        localStorage.setItem("token", "");
        window.location.href = "http://localhost:3000/";
    }

    return (
        <div className="container">
            <Button onClick={handleClick}>Logout</Button>
        </div>
    );

}

export default Logout;