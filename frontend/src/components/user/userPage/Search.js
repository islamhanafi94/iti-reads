import React, { useEffect, useState } from "react";
// import requireAuth from '../../hocs/requireAuth';

import UserNavBar from "../userNavBar";

import axios from "axios";
import DataList from "./DataList";
const Home = props => {

  const [books, setBooks] = useState([]);
  const [type, setType] = useState([]);

  // console.log("props  "+props.location.search)
  useEffect(() => {
     axios
      .get("http://localhost:5000/Search?q="+props.location.search.split("=")[1], {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })

      .then((res) => {
        setBooks(res.data.books);
        setType(res.data.type);
        // console.log(res.data);
      });
  }, [setBooks,setType]);


  return (<>
    <UserNavBar />
      
    <DataList books={books} user={props.user} type={type} />
    </>
  );
};
export default Home;