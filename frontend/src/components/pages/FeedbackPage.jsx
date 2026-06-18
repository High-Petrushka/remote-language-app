import axios from "axios";
import { Common } from "../../Context/Common";
import { CommentsLayout } from "../layout/CommentsLayout";
import { Container } from "../layout/Container";
import { DisplayHero } from "../Typography/DisplayHero";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UserFeedback } from "../interaction/UserFeddback";

export function FeedbackPage() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    let lang = localStorage.getItem("language");

    const navigate = useNavigate();
    const [feedbackList, setFeedbackList] = useState([]);

    if (!lang) {
        lang = "en";
    }

    async function getFeedback() {
        axios.get(
            `${Common.url}/feedback/`,
            {headers: {"Authorization": token}},
        )
        .then((res) => {
            console.log(res.data);
            setFeedbackList(res.data)
        })
        .catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        if (userId != 1) {
            navigate("/");
        } else {
            getFeedback();
        }
    }, []);
    return (
        <Container>
            <DisplayHero>{ Common.lines[lang]["title"]["feedbackPage"] }</DisplayHero>
            <CommentsLayout>
                {
                    feedbackList.map((item) => (
                        <UserFeedback
                            key={item["id"]}
                            userId={item["user_id"]}
                            userName={item["user_name"]}
                            grade={item["grade"]}
                            body={item["body"]}
                            selected={item["selected"]}
                        />
                    ))
                }
            </CommentsLayout>
        </Container>
    );
}