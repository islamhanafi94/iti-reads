import React from "react";
import NavBar from "./components/navBar";
import UserNavBar from "./components/userNavBar";
import CategoryList from "./components/admin/category/CategoryList";
import BooksList from "./components/admin/book/bookList";
import AuthorList from "./components/admin/author/authorList";

import Categories from "./components/user/categories/categoriesList";
import CategoryPage from "./components/user/categories/categoryPage";
// import BooksList from "./components/admin/book/bookList";
// import AuthorList from "./components/admin/author/authorList";

import Register from "./components/auth/Register";
import Login from "./components/login";
import AdminLogin from "./components/adminLogin";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const authBackground =
    "https://images.unsplash.com/photo-1458571037713-913d8b481dc6?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=1920";
// style={{backgroundImage: `url(${authBackground})`}}
function App() {
    return (
        // Admin NavBar and routes

        // <Router>
        //     <NavBar />
        //     <Switch>
        //         <Route exact path="/">
        //         </Route>
        //         <Route exact path="/admin">
        //             <AdminLogin />
        //         </Route>
        //         <Route exact path="/admin/categories">
        //             <CategoryList />
        //         </Route>
        //         <Route exact path="/admin/books">
        //             <BooksList />
        //         </Route>
        //         <Route exact path="/admin/authors">
        //             <AuthorList />
        //         </Route>
        //         <Route exact path="/register">
        //             <Register />
        //         </Route>
        //         <Route>
        //             <NotFound />
        //         </Route>
        //     </Switch>
        // </Router>


        // User NavBar And routes.
        <Router>
        <UserNavBar />
        <Switch>
            <Route exact path="/">
            </Route>
            <Route exact path="/user/categories">
                <Categories/>
            </Route>
            <Route exact path="/user/categories/:catId" component={CategoryPage}>
                {/* <CategoryPage /> */}
            </Route>
            <Route exact path="/user/books">
                <BooksList />
            </Route>
            <Route exact path="/user/authors">
                <AuthorList />
            </Route>
            <Route>
                <NotFound />
            </Route>
        </Switch>
    </Router>
    );
}

const NotFound = () => {
    return (<h1>Page Not found</h1>);
}

export default App;
