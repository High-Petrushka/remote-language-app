import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { Button } from "../interaction/Button";
import { Input } from "../interaction/Input";
import { AuthLayout } from "../layout/AuthLayout";
import { Container } from "../layout/Container";
import { InputLayout } from "../layout/InputLayout";
import { Hero } from "../Typography/Hero";
import { Common } from "../../Context/Common";

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
    const token = localStorage.getItem("token");
    let lang = localStorage.getItem("language");

    if (!lang) {
        lang = "en";
    }

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

        register(`${Common.url}/registration/`);
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

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    });

    return (
        <Container>
            <AuthLayout>
                <Hero level={1}>{ Common.lines[lang]["title"]["registration"] }</Hero>
                <form encType="multipart/form-data" method="POST" id="registerForm" className="min-w-96 my-0 mx-auto flex flex-col gap-8">
                    <InputLayout>
                        <Input
                            id="username"
                            value={login}
                            handleChange={handleLogin}
                            title={Common.lines[lang]["title"]["username"]}
                            type="text"
                            placeholder={Common.lines[lang]["placeholder"]["login"]}
                            errorText={Common.lines[lang]["error"]["empty"]}
                            incorrect={loginErrorFlag}
                        />
                        <Input
                            id="first_name"
                            value={firstName}
                            handleChange={handleFirstName}
                            title={Common.lines[lang]["title"]["name"]}
                            type="text"
                            placeholder={Common.lines[lang]["placeholder"]["name"]}
                            errorText={Common.lines[lang]["error"]["empty"]}
                            incorrect={firstNameErrorFlag}
                        />
                        <Input
                            id="email"
                            value={email}
                            handleChange={handleEmail}
                            title="Email"
                            type="email"
                            placeholder="you@example.com"
                            errorText={Common.lines[lang]["error"]["empty"]}
                            incorrect={emailErrorFlag}
                        />
                        <Input
                            id="password"
                            value={password}
                            handleChange={handlePassword}
                            title={Common.lines[lang]["title"]["password"]}
                            type="password"
                            placeholder={Common.lines[lang]["placeholder"]["password"]}
                            errorText={Common.lines[lang]["error"]["empty"]}
                            incorrect={passwordErrorFlag}
                        />
                    </InputLayout>
                    <Button handleClick={handleSubmit} type="submit">{Common.lines[lang]["button"]["registerBtn"]}</Button>
                </form>
            </AuthLayout>
        </Container>
    );
}