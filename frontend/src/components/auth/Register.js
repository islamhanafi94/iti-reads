import React ,{useState , useEffect} from 'react';
import { useInput } from './hooks/input-hooks';
import axios from 'axios';
import './Auth.css';
import { Link, useHistory } from "react-router-dom";
import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	Col,
	Row,
	Card,
	CardText,
	CardTitle,
	ListGroupItem,
	ListGroup
  } from 'reactstrap';
const Authentication = (props) => {
	const history = useHistory();

	const [errorsRegister,setErrorsRegister]=useState("");

	const { value:usernameRegister, bind:bindUsernameRegister, reset:resetUsernameRegister } = useInput('');
	const { value:passwordRegister, bind:bindPasswordRegister, reset:resetPasswordRegister } = useInput('');
	const { value:passConfRegister, bind:bindPassConfRegister, reset:resetPassConfRegister } = useInput('');
	const { value:email, bind:bindEmail, reset:resetEmail } = useInput('');
	const { value:firstName, bind:bindFirstName, reset:resetFirstName } = useInput('');
	const { value:lastName, bind:bindLastName, reset:resetLastName } = useInput('');

	
    //process.env.REACT_APP_BACKEND_URL
	const registerUrl=`http://localhost:5000/users/register`

	const handleRegisterSubmit = (e)=> {
		e.preventDefault();
		axios.post(registerUrl,
			{
				username:usernameRegister,
				password:passwordRegister,
				email,
				firstName,
				lastName
			},{
				withCredentials: true ,
			}).then(response => {
				console.log(response);
				if (response.status==250){
					setErrorsRegister(response.data.message)
				}else if(response.status==200){
					console.log("good");
					//Should logged in first by history.push what is the route ?
					history.push("/books");
					// window.location = "http://localhost:3000/home";

				}	
			})
			// .catch(error => {
			// console.log("login error", error);
			// });
		}

    return (
		<div className='col-lg-4 col-md-4 col-sm-4 col-xs-4 '>
		<h4>Dont Have an Account ? Create one</h4>
		<hr/>
		<Form onSubmit={handleRegisterSubmit}>
		  <FormGroup>
			<Input type="text" name="firstName" placeholder="First name"
				//    value={} pattern='[A-Za-z\\s]*'
				//    onChange={}
				{...bindFirstName}
				/>
		  </FormGroup>
		  <FormGroup>
			<Input type="text" name="lastName" placeholder="Last name"
				//    value={} pattern='[A-Za-z\\s]*'
				//    onChange={}

				{...bindLastName}
				/>
		  </FormGroup>
		  <FormGroup>
			<Input type="text" name="username" placeholder="Username"
				//    value={} pattern='[A-Za-z\\s]*'
				//    onChange={}
				{...bindUsernameRegister}
				/>
		  </FormGroup>
		  <FormGroup>
			<Input type="email" name="email" placeholder="E-mail"
				//    value={}
				//    onChange={}
				{...bindEmail}

				/>
		  </FormGroup>
		  <FormGroup>
			<Input type="password" name="password" placeholder="password "
				//    value={}
				//    onChange={}
				{...bindPasswordRegister}
				/>

				 </FormGroup>
				 <FormGroup>
			<Input type="password" name="password" placeholder="passwordConfirmation"
				//    value={}
				//    onChange={}
				{...bindPassConfRegister}
				/>

				 </FormGroup>

		  <Button onSubmit={handleRegisterSubmit}> Sign up</Button>
		</Form>
	  </div>




		)

	}

export default Authentication