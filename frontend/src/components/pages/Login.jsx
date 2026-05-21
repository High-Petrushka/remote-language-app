import { useState } from "react";

import { AuthLayout } from "../layout/AuthLayout";
import { Container } from "../layout/Container";
import { Button } from "../interaction/Button";
import { Input } from "../interaction/Input";
import { InputLayout } from "../layout/InputLayout";
import { Hero } from "../Typography/Hero";
import { useNavigate } from "react-router";
import { ErrorLayout } from "../layout/ErrorLayout";
import { ErrorText } from "../Typography/ErrorText";

export function Login() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const [authErrorFlag, setAuthErrorFlag] = useState("");

    const navigate = useNavigate();

    const handleLogin = (e) => {
        setLogin(e.target.value);
        if (authErrorFlag) {
            setAuthErrorFlag(false);
        }
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
        if (authErrorFlag) {
            setAuthErrorFlag(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser("http://localhost:8000/login/", {
            username: login,
            password: password,
        });
    };

    async function loginUser(url, info) {
        try {
            let response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(info),
            });

            if (response.status == 200) {
                let result = await response.json();
                localStorage.setItem("token", `Token ${result.token}`);
                localStorage.setItem("userId", result.user_id);
                navigate("/");
            } else {
                setAuthErrorFlag(true);
            }
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <Container>
            <AuthLayout>
                <Hero level={1}>Login</Hero>
                <form method="POST" className="min-w-96 my-0 mx-auto flex flex-col gap-8">
                    <InputLayout>
                        <Input
                            id="username"
                            value={login}
                            handleChange={handleLogin}
                            title="Username"
                            type="text"
                            placeholder="Your login..."
                            errorText=""
                            incorrect={authErrorFlag}
                        />
                        <Input
                            id="password"
                            value={password}
                            handleChange={handlePassword}
                            title="Password"
                            type="password"
                            placeholder="Your password..."
                            errorText=""
                            incorrect={authErrorFlag}
                        />
                        <ErrorLayout active={authErrorFlag}>
                            <ErrorText>Incorrect login or password</ErrorText>
                        </ErrorLayout>
                    </InputLayout>
                    <Button handleClick={handleSubmit} type="submit">Login</Button>
                </form>
            </AuthLayout>
        </Container>
    );
}