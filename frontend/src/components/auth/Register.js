import React, { useState, useEffect } from 'react';
import { useInput } from './hooks/input-hooks';
import axios from 'axios';
import './Auth.css';
import { Link, useHistory } from "react-router-dom";
import {
	Button,
	Form,
	FormGroup,
	Input,

} from 'reactstrap';

const Authentication = (props) => {
	const history = useHistory();

	const [errorsRegister, setErrorsRegister] = useState("");
	const [isRegistered, setIsRegistered] = useState(false);
	const [isNotRegistered, setIsNotRegistered] = useState(false);

	const { value: usernameRegister, bind: bindUsernameRegister, reset: resetUsernameRegister } = useInput('');
	const { value: passwordRegister, bind: bindPasswordRegister, reset: resetPasswordRegister } = useInput('');
	const { value: passConfRegister, bind: bindPassConfRegister, reset: resetPassConfRegister } = useInput('');
	const { value: email, bind: bindEmail, reset: resetEmail } = useInput('');
	const { value: firstName, bind: bindFirstName, reset: resetFirstName } = useInput('');
	const { value: lastName, bind: bindLastName, reset: resetLastName } = useInput('');


	//process.env.REACT_APP_BACKEND_URL
	const registerUrl = `http://localhost:5000/users/register`;

	const handleRegisterSubmit = (e) => {
		e.preventDefault();
		if (passwordRegister === passConfRegister) {

			axios.post(registerUrl,
				{
					username: usernameRegister,
					password: passwordRegister,
					email,
					firstName,
					lastName
				}, {
				withCredentials: true,
			}).then(response => {
				console.log(response);
				if (response.status == 250) {
					setErrorsRegister(response.data.message);
					setIsNotRegistered(true);
				} else if (response.status == 200) {
					console.log("good");
					setIsRegistered(true);
					//Should logged in first by history.push what is the route ?
					
					history.push("/");
					// window.location = "http://localhost:3000/home";

				} else if (response.status == 500) {
					setIsNotRegistered(true);
				}
			});

		}
	};

	return (
		<div className='col-lg-4 col-md-4 col-sm-4 col-xs-4 '>
			{/* {
				isNotRegistered ? (
					<div className="alert alert-danger">
						Registration Error, Please review your data! 
					</div>
				) : null
			} */}
			<h4>Dont Have an Account ? Create one</h4>
			<hr />
			<Form onSubmit={ handleRegisterSubmit }>
				<FormGroup>
					<Input type="text" name="firstName" placeholder="First name"
						pattern='[A-Za-z\\s]*'
						{ ...bindFirstName }
					/>
				</FormGroup>
				<FormGroup>
					<Input type="text" name="lastName" placeholder="Last name"
						pattern='[A-Za-z\\s]*'

						{ ...bindLastName }
					/>
				</FormGroup>
				<FormGroup>
					<Input type="text" name="username" placeholder="Username"
						pattern='[A-Za-z\\s]*'
						{ ...bindUsernameRegister }
					/>
				</FormGroup>
				<FormGroup>
					<Input type="email" name="email" placeholder="E-mail"

						{ ...bindEmail }

					/>
				</FormGroup>
				<FormGroup>
					<Input type="password" name="password" placeholder="password "

						{ ...bindPasswordRegister }
					/>

				</FormGroup>
				<FormGroup>
					<Input type="password" name="password" placeholder="passwordConfirmation"

						{ ...bindPassConfRegister }
					/>

				</FormGroup>

				<Button onSubmit={ handleRegisterSubmit }> Sign up</Button>
			</Form>
			<br />
			{ errorsRegister ? <div className="errors-div">
				<small> { errorsRegister }</small>
			</div> : null }
			{ isRegistered ? (
				<div className="alert alert-success">
					You are registered, Log in with your email and password to enjoy our website!
				</div>
			) : null }
		</div>




	);

};

export default Authentication;