import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, FormGroup, Label, Input, Button, Jumbotron, Badge } from 'reactstrap';

const AdminLogout = (props) => {

    const handleClick = () => {
        localStorage.setItem("token", "");
        window.location.href = "http://localhost:3000/admin";
    }

    return (
        <div className="container">
            <Button onClick={handleClick}>Logout</Button>
        </div>
    );

}

export default AdminLogout;