import { useState } from "react";
import { useNavigate } from "react-router";

import { Button } from "../interaction/Button";
import { Input } from "../interaction/Input";
import { AuthLayout } from "../layout/AuthLayout";
import { Container } from "../layout/Container";
import { InputLayout } from "../layout/InputLayout";
import { Hero } from "../Typography/Hero";

export function Registration() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");

    const [loginError, setLoginError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [firstNameError, setFirstNameError] = useState("");

    const [loginErrorFlag, setLoginErrorFlag] = useState(false);
    const [passwordErrorFlag, setPasswordErrorFlag] = useState(false);
    const [emailErrorFlag, setEmailErrorFlag] = useState(false);
    const [firstNameErrorFlag, setFirstNameErrorFlag] = useState(false);

    const navigate = useNavigate();

    const handleLogin = (e) => {
        setLogin(e.target.value);
        if (loginErrorFlag) {
            setLoginErrorFlag(false);
        }
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
        if (passwordErrorFlag) {
            setPasswordErrorFlag(false);
        }
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
        if (emailErrorFlag) {
            setEmailErrorFlag(false);
        }
    };

    const handleFirstName = (e) => {
        setFirstName(e.target.value);
        if (firstNameError) {
            setFirstNameErrorFlag(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        register('http://localhost:8000/registration/');
    };

    async function register(url) {
        try {
            const formData = new FormData(document.querySelector("#registerForm"));
            console.log(formData)

            let response = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            if (response.status == 201) {
                navigate("/");
            } else {
                let result = await response.json();
                for (let item in result) {
                    switch(item) {
                        case "username":
                            setLoginError(result[item]);
                            setLoginErrorFlag(true);
                            break;
                        case "email":
                            setEmailError(result[item]);
                            setEmailErrorFlag(true);
                            break;
                        case "password":
                            setPasswordError(result[item]);
                            setPasswordErrorFlag(true);
                            break;
                        case "first_name":
                            setFirstNameError(result[item]);
                            setFirstNameErrorFlag(true);
                            break;
                    }
                }
            }
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <Container>
            <AuthLayout>
                <Hero level={1}>Registration</Hero>
                <form encType="multipart/form-data" method="POST" id="registerForm" className="min-w-96 my-0 mx-auto flex flex-col gap-8">
                    <InputLayout>
                        <Input
                            id="username"
                            value={login}
                            handleChange={handleLogin}
                            title="Login"
                            type="text"
                            placeholder="Your login..."
                            errorText={loginError}
                            incorrect={loginErrorFlag}
                        />
                        <Input
                            id="first_name"
                            value={firstName}
                            handleChange={handleFirstName}
                            title="First name"
                            type="text"
                            placeholder="Your first name..."
                            errorText={firstNameError}
                            incorrect={firstNameErrorFlag}
                        />
                        <Input
                            id="email"
                            value={email}
                            handleChange={handleEmail}
                            title="Email"
                            type="email"
                            placeholder="you@example.com"
                            errorText={emailError}
                            incorrect={emailErrorFlag}
                        />
                        <Input
                            id="password"
                            value={password}
                            handleChange={handlePassword}
                            title="Password"
                            type="password"
                            placeholder="Your password..."
                            errorText={passwordError}
                            incorrect={passwordErrorFlag}
                        />
                    </InputLayout>
                    <Button handleClick={handleSubmit} type="submit">Registration</Button>
                </form>
            </AuthLayout>
        </Container>
    );
}