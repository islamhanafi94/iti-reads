import React ,{useState ,useEffect} from 'react';
import NavBar from '../components/navBar';
import './Home.css';
import axios from 'axios';
import { Link } from "react-router-dom";


const Home = () => {
  const [books,setBooks]=useState([]);
  const [popularBooks,setpopulaBooks]=useState([]);
  const [popularAuthors,setpopularAuthors]=useState([]);
  const [poularCategories,setpoularCategories]=useState([]);

  
  const booksURL = `http://localhost:5000/books`
  const popularBooksURL = `http://localhost:5000/books/popular`
  const popularAuthorsURL = `http://localhost:5000/author/popular`
  const popularCategoryURL = `http://localhost:5000/category/popular`

    useEffect(  () => {
       axios.get(booksURL).then(response => {
        // console.log(response.data);
        setBooks(response.data);
      }).catch(err=>{
        console.log(err);
      });
        axios.get(popularBooksURL).then(response => {
        // console.log(response.data);
        setpopulaBooks(response.data);
      }).catch(err=>{
        console.log(err);
      });
       axios.get(popularAuthorsURL).then(response => {
        // console.log(response.data);
        setpopularAuthors(response.data);
      }).catch(err=>{
        console.log(err);
      });
      axios.get(popularCategoryURL).then(response => {
        // console.log(response.data);
        setpoularCategories(response.data);
      }).catch(err=>{
        console.log(err);
      });
    }, [])
 
    return (
    <>    
    {/* <NavBar/> */}
    <div className="main-container">
    <div key="left-div" className="left-div">
    <fieldset key="books" className="popular">
      <legend> <strong>Popular Books</strong></legend>
     <ul>
     {
      popularBooks.map(book => {
          return(
            <li className="popular-list-item">
              <Link title={`By: ${book.author.name}`} key={book.name} to="/unauthorized">{book.name}</Link>
            </li>
          )
      })   
     }
      
     </ul>
    </fieldset>
    
    <fieldset key="authors" className="popular">
      <legend> <strong>Popular Authors</strong></legend>
     <ul>
     {
      popularAuthors.map(author => {
          return(
            <li className="popular-list-item">
              <Link key={author.name} to="/unauthorized">{author.name}</Link>
            </li>
          )
      })   
     }
     </ul>
    </fieldset>
    <fieldset key="categories" className="popular">
      <legend> <strong>Popular Categories</strong></legend>
     <ul>
     {
      poularCategories.map(category => {
          return(
            <li className="popular-list-item">
              <Link key={category.name} to="/unauthorized">{category.name}</Link>
            </li>
          )
      })   
     }
       
     </ul>
    </fieldset>  
    </div>

      <div key="right-div"  className="right-div">
    
        
      {
        books.map(book => {
          return(
          <Link  key={book.name} to="/unauthorized">
            <div className="card CardDiv">
              
              <img  src={`${process.env.REACT_APP_BACKEND_URL}${book.image}`} width="100%" height="125" alt="Card image cap" className="card-img-top" alt="post"></img>
              <h4 
              className="card-title">{book.name}</h4>
            
            <small>Category : {book.category.name} </small> <br/>
            <hr/>
            <small >By:{book.author.name}</small>
            </div>
          </Link>
          )
          }) 
      }

      </div>    
    </div>
    </>


    )
}

export default Home