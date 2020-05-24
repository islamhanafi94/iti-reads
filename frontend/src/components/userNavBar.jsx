import React, { useState } from "react";
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
import { Link } from 'react-router-dom';
import Login from "./login";

const NavBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

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
                        <Link className="nav-link" to="/user/categories">Categories</Link>
                    </NavItem>
                    <NavItem>
                        <Link className="nav-link" to="/user/books">Books</Link>
                    </NavItem>
                    <NavItem>
                        <Link className="nav-link" to="/user/authors">Authors</Link>
                    </NavItem>
                    <NavItem>
                        <Login />
                    </NavItem>
                </Nav>
                {/* <Button color="info">logout</Button> */}

                
            </Collapse>
        </Navbar>
    );
};

export default NavBar;
