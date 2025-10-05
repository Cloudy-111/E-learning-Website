import { useState } from 'react'
import '../assets/styles/components/_formRegister.scss'

function FormRegister(props){
    const [regsiterInputs, setRegsiterInputs] = useState({});

    function handleChange(e){
        const name = e.target.name;
        const value = e.target.value;

        setRegsiterInputs(values => ({...values, [name]: value}))
    }

    async function handleSubmit(e){
        e.preventDefault();

        const emailInput = regsiterInputs[props.email] || ""
        const usernameInput = regsiterInputs[props.username] || ""
        const passwordInput = regsiterInputs[props.password] || ""

        if (emailInput.trim().length == 0 || usernameInput.trim().length == 0 || passwordInput.trim().length == 0) {
            alert("PLEASE FILL THE INPUTS");
            return;
        }

        try{
            const response = await fetch("http://localhost:5102/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: emailInput,
                    username: usernameInput,
                    password: passwordInput
                })
            })

            if (response.ok) {
                const data = await response.json();
                alert("Register success: " + JSON.stringify(data));
            } else {
                const error = await response.json();
                alert("Register failed: " + JSON.stringify(error));
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong!");
        }
    }

    return (
        <form className='form-register' onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    placeholder='Username'
                    name={ props.username}
                    value={regsiterInputs[props.username] || ""}
                    onChange={handleChange}
                />
            </label>

            <label>
                Email:
                <input
                    type="text"
                    placeholder='Email'
                    name={ props.email}
                    value={regsiterInputs[props.email] || ""}
                    onChange={handleChange}
                />
            </label>
            <label>
                Password
                <input
                    type="password"
                    placeholder='Password'
                    name={ props.password}
                    value={regsiterInputs[props.password] || ""}
                    onChange={handleChange}
                />
            </label>
            <input type='submit'/>

        </form>
    )
}

export default FormRegister;