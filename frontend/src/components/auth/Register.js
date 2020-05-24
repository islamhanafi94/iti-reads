import React ,{useState , useEffect} from 'react';
import { useInput } from './hooks/input-hooks';
import axios from 'axios';
import './Auth.css';
import { Link, useHistory } from "react-router-dom";
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
					
					// history.push("/login");
				}	
			})
			// .catch(error => {
			// console.log("login error", error);
			// });
		}
    return (





		
<div className="login-wrap">
    <div className="login-html">
    <input id="tab-1" type="radio" name="tab" className="sign-in" />
	<label htmlFor="tab-1" className="tab">
	<Link  to="/login">Sign In</Link>
	
	</label>
	<input id="tab-2" type="radio" name="tab" className="sign-up" checked/>
	<label htmlFor="tab-2" className="tab">Sign Up</label>
		<div className="login-form">
		<div className="sign-up-htm">
			<form onSubmit={handleRegisterSubmit}>
				<div className="group">
					<label htmlFor="firstName" className="label">First Name</label>
					<input id="firstName" type="text" name="firstName" className="input"
					  {...bindFirstName} />
				</div>
				<div className="group">
					<label htmlFor="lastName" className="label">Last Name</label>
					<input id="lastName" type="text" name="lastName" className="input" 
						{...bindLastName}
					/>
				</div>
				<div className="group">
					<label htmlFor="user" className="label">Username</label>
					<input id="user" type="text" name="username" className="input"
						{...bindUsernameRegister}
					/>
				</div>
				<div className="group">
					<label htmlFor="email" className="label">Email Address</label>
					<input id="email" type="text" name="email" className="input" 
							{...bindEmail}
					/>
				</div>
				<div className="group">
					<label htmlFor="password" className="label">Password</label>
					<input id="password" type="password" name="password" className="input" data-type="password" 
							{...bindPasswordRegister}
					/>
				</div>
				<div className="group">
					<label htmlFor="password-confirm" className="label">Repeat Password</label>
					<input id="password-confirm" type="password" name="password-confirm" className="input" data-type="password" 
							{...bindPassConfRegister}
					/>
				</div>
				<div className="group">
					<input type="submit" className="button" value="Sign Up" />
				</div>
			</form>
				<div style={{textAlign:"center"}}>
					<label htmlFor="tab-1" >Already Member?</label>
				</div>
					{errorsRegister?<div className="errors-div">
				  <small> {errorsRegister}</small>
				</div>:null}
			</div>
		</div>
	</div>
</div>

)}

export default Authentication