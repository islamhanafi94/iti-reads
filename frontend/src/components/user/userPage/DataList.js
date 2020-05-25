import React from 'react';
import requireAuth from '../../hocs/requireAuth';
import axios from '../../axios/logged';
import { Redirect } from "react-router-dom";

const DataList = (props) => {

    const myStyle = {
        padding: "0px",
    }
    const books = props.books;
    

    const handleChangeListing = (e) => {
        // console.log(e.target.value + " hihihi " + e.target.id)
        window.location.replace(`http://localhost:5001/${e.target.value}`);
    }
  
    

    return (