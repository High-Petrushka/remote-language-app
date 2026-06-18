import { useEffect, useState } from "react";

import { AuthLayout } from "../layout/AuthLayout";
import { Container } from "../layout/Container";
import { Button } from "../interaction/Button";
import { Input } from "../interaction/Input";
import { InputLayout } from "../layout/InputLayout";
import { Hero } from "../Typography/Hero";
import { useNavigate } from "react-router";
import { ErrorLayout } from "../layout/ErrorLayout";
import { ErrorText } from "../Typography/ErrorText";
import { Common } from "../../Context/Common";

export function Login() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const [authErrorFlag, setAuthErrorFlag] = useState("");

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    let lang = localStorage.getItem("language");

    if (!lang) {
        lang = "en";
    }

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
        loginUser(`${Common.url}/login/`, {
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
                localStorage.setItem("language", result.language);
                navigate("/");
            } else {
                setAuthErrorFlag(true);
            }
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    })

    return (
        <Container>
            <AuthLayout>
                <Hero level={1}>{ Common.lines[lang]["title"]["login"] }</Hero>
                <form method="POST" className="min-w-96 my-0 mx-auto flex flex-col gap-8">
                    <InputLayout>
                        <Input
                            id="username"
                            value={login}
                            handleChange={handleLogin}
                            title={Common.lines[lang]["title"]["username"]}
                            type="text"
                            placeholder={Common.lines[lang]["placeholder"]["login"]}
                            errorText=""
                            incorrect={authErrorFlag}
                        />
                        <Input
                            id="password"
                            value={password}
                            handleChange={handlePassword}
                            title={Common.lines[lang]["title"]["password"]}
                            type="password"
                            placeholder={Common.lines[lang]["placeholder"]["password"]}
                            errorText=""
                            incorrect={authErrorFlag}
                        />
                        <ErrorLayout active={authErrorFlag}>
                            <ErrorText>{ Common.lines[lang]["error"]["loginPassword"] }</ErrorText>
                        </ErrorLayout>
                    </InputLayout>
                    <Button handleClick={handleSubmit} type="submit">{ Common.lines[lang]["button"]["loginBtn"] }</Button>
                </form>
            </AuthLayout>
        </Container>
    );
}