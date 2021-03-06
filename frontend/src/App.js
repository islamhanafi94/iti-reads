import React from "react";
import NavBar from "./components/admin/adminNavBar";
import UserNavBar from "./components/user/userNavBar";
import CategoryList from "./components/admin/category/CategoryList";
import BooksList from "./components/admin/book/bookList";
import AuthorList from "./components/admin/author/authorList";
import AuthorsMenu from "./components/user/author/authorMenu";
import AuthorPage from "./components/user/author/authorPage";
import Home from "./components/user/Home";

import Categories from "./components/user/categories/categoriesList";
import CategoryPage from "./components/user/categories/categoryPage";
import BooksMenu from "./components/user/book/booksMenu";

import Register from "./components/auth/Register";
import AdminLogin from "./components/admin/adminLogin";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserPage from './components/user/userPage/userPage';
import BookPage from "./components/user/book/bookPage";
import Search from './components/user/userPage/Search';
const authBackground =
    "https://images.unsplash.com/photo-1458571037713-913d8b481dc6?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=1920";

function App() {
    return (

        // NavBar And routes.
        <Router>
            <Switch>
                <Route exact path="/admin">
                    <NavBar />
                    <AdminLogin />
                </Route>
                <Route exact path="/admin/categories">
                    <NavBar />
                    <CategoryList />
                </Route>
                <Route exact path="/admin/books">
                    <NavBar />
                    <BooksList />
                </Route>
                <Route exact path="/admin/authors">
                    <NavBar />
                    <AuthorList />
                </Route>
                <Route exact path="/register">
                    <NavBar />
                    <Register />
                </Route>
                <Route exact path="/" >
                    <UserNavBar />
                    <Home />
                </Route>
                <Route path='/search'
                    exact component={ Search } />

                <Route exact path="/register" component={ Register } />
                <Route exact path="/categories">
                    <UserNavBar />
                    <Categories />
                </Route>
                <Route exact path="/categories/:catId">
                    <UserNavBar />
                    <CategoryPage />
                </Route>
                <Route exact path="/books">
                    <UserNavBar />
                    <BooksMenu />
                </Route>
                <Route exact path="/authors">
                    <UserNavBar />
                    <AuthorsMenu />
                </Route>
                <Route exact path="/authors/:authorId">
                    <UserNavBar />
                    <AuthorPage />
                </Route>
                <Route path="/testUserPage" >
                    <UserNavBar />
                    <UserPage />
                </Route>
                <Route exact path="/books/:bookId">
                    <UserNavBar />
                    <BookPage />
                </Route>
                <Route>
                    <UserNavBar />
                    <NotFound />
                </Route>
            </Switch>
        </Router>
    );
}

const NotFound = () => {
    return (<h1>Page Not found</h1>);
};

export default App;