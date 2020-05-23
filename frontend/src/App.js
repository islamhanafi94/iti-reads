import React from "react";
import NavBar from "./components/navBar";
import CategoryList from "./components/admin/category/CategoryList";
import BooksList from "./components/admin/book/bookList";
import AuthorList from "./components/admin/author/authorList";
import Register from "./components/auth/Register";
import Login from "./components/login";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const authBackground =
    "https://images.unsplash.com/photo-1458571037713-913d8b481dc6?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=1920";
// style={{backgroundImage: `url(${authBackground})`}}
function App() {
    return (
        <Router>
            <Switch>
            <Route exact path="/">
                    <div>
                        <NavBar />
                    </div>
                </Route>
                <Route exact path="/admin">
                    <div>
                        <NavBar />
                    </div>
                </Route>
                <Route exact path="/admin/categories">
                    <div>
                        <NavBar />
                        <CategoryList/>
                    </div>
                </Route>
                <Route exact path="/admin/books">
                    <div>
                        <NavBar />
                        <BooksList/>
                    </div>
                </Route>
                <Route exact path="/admin/authors">
                    <div>
                        <NavBar />
                        <AuthorList />
                    </div>
                </Route>
                <Route exact path="/register">
                    <div>
                        <NavBar />
                        <Register />
                    </div>
                </Route>
                {/* <Route exact path="/login">
                    <div>
                        <NavBar />
                        <Login />
                    </div>
                </Route> */}
            </Switch>
        </Router>
    );
}

export default App;
