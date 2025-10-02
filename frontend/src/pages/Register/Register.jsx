import { useState } from 'react'

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
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    name={ props.username}
                    value={regsiterInputs[props.username] || ""}
                    onChange={handleChange}
                />
            </label>

            <label>
                Email:
                <input
                    type="text"
                    name={ props.email}
                    value={regsiterInputs[props.email] || ""}
                    onChange={handleChange}
                />
            </label>
            <label>
                Password
                <input
                    type="password"
                    name={ props.password}
                    value={regsiterInputs[props.password] || ""}
                    onChange={handleChange}
                />
            </label>
            <input type='submit'/>

        </form>
    )
}

function RegisterPage(){

    return (
        <div>
            <h1>THIS IS REGISTER PAGE</h1>
            <FormRegister 
                username = "username"
                email = "email"
                password = "password"
            />
        </div>
    )
}

export default RegisterPage;