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
// import BooksList from "./components/admin/book/bookList";

import Register from "./components/auth/Register";
import Login from "./components/login";
import AdminLogin from "./components/admin/adminLogin";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserPage from './components/user/userPage/userPage';
const authBackground =
    "https://images.unsplash.com/photo-1458571037713-913d8b481dc6?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=1920";
// style={{backgroundImage: `url(${authBackground})`}}
function App() {
    return (
        // Admin NavBar and routes

        // <Router>
        //     <NavBar />
        //     <Switch>
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
        //     <Router>
        //     <UserNavBar />
        //     <Switch>
        //         <Route exact path="/" component={Home}/>
        //         <Route exact path="/register" component={Register}/>
        //         <Route exact path="/categories">
        //             <Categories/>
        //         </Route>
        //         <Route exact path="/categories/:catId" component={CategoryPage} />
        //         <Route exact path="/books">
        //             <BooksList />
        //         </Route>
        //         <Route exact path="/authors">

        //         </Route>
        //         <Route path="/testUserPage" component={UserPage} />
        //         <Route>
        //             <NotFound />
        //         </Route>
        //     </Switch>
        // </Router>



        // User NavBar And routes.
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
                    <UserPage />
                </Route>
                <Route exact path="/authors">
                    <UserNavBar />
                    <AuthorsMenu />
                </Route>
                <Route exact path="/authors/:authorId">
                    <UserNavBar />
                    <AuthorPage />
                </Route>
                {/* <Route path="/testUserPage" /> */}
                    
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