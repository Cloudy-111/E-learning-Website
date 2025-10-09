/* eslint-disable no-unused-vars */
import { useState } from "react"

function FormLogin(props){
    const [loginInputs, setLoginInputs] = useState([]);
    
    function handleChange(e){
        const name = e.target.name;
        const value = e.target.value;

        setLoginInputs(values => ({...values, [name]: value}))
    }

    async function handleSubmit(e){
        e.prevenDefault();

        const emailInput = loginInputs[props.email] || "";
        const passwordInput = loginInputs[props.password] || "";

        if (emailInput.trim().length == 0 || passwordInput.trim().length == 0) {
            alert("PLEASE FILL THE INPUTS");
            return;
        }

        try{
            const response = await fetch("http://localhost:5102/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: emailInput,
                    password: passwordInput
                })
            })

            if (response.ok) {
                const data = await response.json();
                alert("Login success: " + JSON.stringify(data));
            } else {
                const error = await response.json();
                alert("Login failed: " + JSON.stringify(error));
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong!");
        }
    }

    return (
        <form className='form-register-login' onSubmit={handleSubmit}>
            <label>
                Email:
                <input
                    type="text"
                    placeholder='Email'
                    name={ props.email}
                    value={loginInputs[props.email] || ""}
                    onChange={handleChange}
                />
            </label>
            <label>
                Password
                <input
                    type="password"
                    placeholder='Password'
                    name={ props.password}
                    value={loginInputs[props.password] || ""}
                    onChange={handleChange}
                />
            </label>
            <input type='submit'/>

        </form>
    )
}

export default FormLogin