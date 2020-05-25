import React, { useState, useEffect } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button,
    
} from "reactstrap";
import { Form, FormControl} from 'react-bootstrap';

import { Link } from 'react-router-dom';
import axios from "axios";
import Login from "../login";
import Logout from "../user/logout";

const NavBar = (props) => {
    const [searchInput, setSearchInput] = useState("");
    const handleChange = (e) => {
        setSearchInput(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);


    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        (async function () {
            try {
                let response = await axios.get(
                    "http://localhost:5000/users/logincheck", {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    }
                }
                ).then((response) => {
                    if (response.status === 200) {
                        setIsLoggedIn(true);
                        console.log("changed...");
                    }
                    console.log("isin : ", response.data.user)
                });


            } catch (error) {
                console.log("error is ...", error);
            }
        })();
    }, []);
    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand href="/">itiReads</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <Link className="nav-link" to="/">Home</Link>
                    </NavItem>
                    <NavItem>
                        <Link className="nav-link" to="/categories">Categories</Link>
                    </NavItem>
                    <NavItem>
                        <Link className="nav-link" to="/books">Books</Link>
                    </NavItem>
                    <NavItem>
                        <Link className="nav-link" to="/authors">Authors</Link>
                    </NavItem>
                    {
                        isLoggedIn == false ? (
                            <NavItem>
                                <Login />
                            </NavItem>
                        ) : <Logout />
                    }
                </Nav>
                {/* <Button color="info">logout</Button> */}


            </Collapse>
            <Form inline onSubmit={handleSubmit}>
                    <FormControl type="text" value={searchInput} onChange={handleChange} placeholder="book or author name" className="mr-sm-2" />
                    <Link to={`/search/${searchInput}`}>
                        <Button  variant="outline-primary">Search</Button>
                    </Link>
                </Form>
        </Navbar>
    );
};

export default NavBar;
