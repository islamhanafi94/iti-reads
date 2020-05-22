import React, { useState } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText,
} from "reactstrap";

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
                        <NavLink href="/admin">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/admin/categories">Categories</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/admin/books">Books</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/admin/authors">Authors</NavLink>
                    </NavItem>
                </Nav>
                <NavbarText>Simple Text</NavbarText>
            </Collapse>
        </Navbar>
    );
};

export default NavBar;
