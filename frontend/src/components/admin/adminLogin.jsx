import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, FormGroup, Label, Input, Button, Jumbotron, Badge } from 'reactstrap';

const AdminLogin = (props) => {
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        (async function () {
            try {
                let response = await axios.get("http://localhost:5000/users/admin", {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    }
                }).then((response) => {
                    if (response.data.status === 200) {
                        setIsLoggedIn(true);
                        console.log("status :", isLoggedIn);
                    }
                });

            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const hanleEmailChange = (e) => {
        const { target: { value } } = e;
        setEmailInput(value);
    }

    const hanlePasswordChange = (e) => {
        const { target: { value } } = e;
        setPasswordInput(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:5000/users/login',
            data: {
                email: emailInput,
                password: passwordInput
            }
        }).then((response) => {
            const { token } = response.data;
            localStorage.setItem("token", token);
            console.log("response",response.data)
            window.location.href = "http://localhost:3000/admin";
        }, (error) => {
            console.log(error);
        });

        setEmailInput('');
        setPasswordInput('');
    }


    if (isLoggedIn == false) {
        return (
            <div className="container">
                <Jumbotron>
                    <h1 style={{ textAlign: "center" }}><Badge color="secondary" >Welcome to Admin Panel</Badge></h1>
                    <Form>
                        <FormGroup>
                            <Label for="Email">Email</Label>
                            <Input type="email" name="email" id="Email" placeholder="Email" onChange={hanleEmailChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Password">Password</Label>
                            <Input type="password" name="password" id="Password" placeholder="Password" onChange={hanlePasswordChange} />
                        </FormGroup>
                        <Button onClick={handleSubmit} block>Login</Button>
                    </Form>
                </Jumbotron>

            </div>
        );
    }
    else {
        return (
            <div className="container">
                <Jumbotron>
                    <h1 style={{ textAlign: "center" }}><Badge color="secondary" >Welcome to Admin Panel</Badge></h1>
                </Jumbotron>

            </div>
        );
    }




}

export default AdminLogin;