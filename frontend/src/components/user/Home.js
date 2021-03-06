import React, { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import Register from "../auth/Register";
import UserPage from '../user/userPage/userPage';
// import { popularAuthor } from '../../../../backend/src/controllers/author.controller';
const Home = () => {
  // const [books, setBooks] = useState([]);
  const [popularBooks, setpopulaBooks] = useState([]);
  const [popularAuthors, setpopularAuthors] = useState([]);
  const [poularCategories, setpoularCategories] = useState([]);


  const popularBooksURL = `http://localhost:5000/books/popular`;
  const popularAuthorsURL = `http://localhost:5000/author/popular`;
  const popularCategoryURL = `http://localhost:5000/category/popular`;

  useEffect(() => {
    axios.get(popularBooksURL, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    }).then(response => {
      // console.log(response.data);
      setpopulaBooks(response.data);
    }).catch(err => {
      console.log(err);
    });
    /*=================================*/
    axios.get(popularAuthorsURL, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    }).then(response => {
      setpopularAuthors(response.data);
    }).catch(err => {
      console.log(err);
    });
    /*=================================*/
    axios.get(popularCategoryURL, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    }).then(response => {
      // console.log(response.data);
      setpoularCategories(response.data);
    }).catch(err => {
      console.log(err);
    });
  }, []);

  return (
    <>
      { localStorage.getItem("token") ? (<UserPage />) : (
        <div className="main-container">
          <div key="left-div" className="left-div">
            <fieldset key="books" className="popular">
              <legend> <strong>Popular Books</strong></legend>
              <ul>
                {
                  popularBooks.map(book => {
                    return (
                      <li className="popular-list-item">
                        <Link key={ book.name } to={ `/books/${book._id}` }>{ book.name }</Link>
                      </li>
                    );
                  })
                }

              </ul>
            </fieldset>

            <fieldset key="authors" className="popular">
              <legend> <strong>Popular Authors</strong></legend>
              <ul>
                {
                  popularAuthors.map(author => {
                    return (
                      <li className="popular-list-item">
                        <Link key={ author.firstName } to={ `/authors/${author._id}` }>{ author.firstName }</Link>
                      </li>
                    );
                  })
                }
              </ul>
            </fieldset>
            <fieldset key="categories" className="popular">
              <legend> <strong>Popular Categories</strong></legend>
              <ul>
                {
                  poularCategories.map(category => {
                    const id = category._id;
                    const url = `/categories/${id}`;
                    return (

                      <li className="popular-list-item">

                        <Link key={ category.name } to={ url }>{ category.name }</Link>
                      </li>
                    );
                  })
                }

              </ul>
            </fieldset>
          </div>

          <div key="right-div" className="right-div">
            <Register />
          </div>

        </div>) }

    </>
  );
};

export default Home;