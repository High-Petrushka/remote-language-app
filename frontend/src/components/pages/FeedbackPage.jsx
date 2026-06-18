import axios from "axios";
import { Common } from "../../Context/Common";
import { CommentsLayout } from "../layout/CommentsLayout";
import { Container } from "../layout/Container";
import { DisplayHero } from "../Typography/DisplayHero";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { UserFeedback } from "../interaction/UserFeddback";
import { FilterTitle } from "../Typography/FilterTitle";
import { FilterBtn } from "../interaction/FilterBtn";

export function FeedbackPage() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    let lang = localStorage.getItem("language");

    const navigate = useNavigate();
    const [feedbackList, setFeedbackList] = useState([]);
    const [sent, setSent] = useState(false);
    const [sort, setSort] = useState("");

    if (!lang) {
        lang = "en";
    }

    function getSort(sortParam) {
        if (sort == sortParam) {
            setSort("");
        } else {
            setSort(sortParam);
        }
    }

    async function getFeedback() {
        axios.get(
            `${Common.url}/feedback/?sort_by=${sort}`,
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

    async function setSelected(feedbackId, selectState) {
        axios.patch(
            `${Common.url}/feedback/${feedbackId}/`,
            {selected: !selectState},
            {headers: {"Authorization": token}}
        )
        .then((res) => {
            setSent(!sent);
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    async function deleteFeedback(feedbackId) {
        axios.delete(
            `${Common.url}/feedback/${feedbackId}/`,
            {headers: {"Authorization": token}}
        )
        .then(() => {
            setSent(!sent);
        })
        .catch((err) => {
            console.log(err)
        });
    }

    useEffect(() => {
        if (userId != 1) {
            navigate("/");
        } else {
            getFeedback();
        }
    }, [sent, sort]);
    return (
        <Container>
            <DisplayHero>{ Common.lines[lang]["title"]["feedbackPage"] }</DisplayHero>
            <div className="flex flex-col gap-4 mt-12">
                <div className="flex items-center justify-between">
                    <FilterTitle>{ Common.lines[lang]["title"]["sortBy"] }</FilterTitle>
                    <div className="flex gap-2 justify-end flex-wrap">
                        <FilterBtn handleClick={() => getSort("-grade")} active={sort == "-grade"}>{ Common.lines[lang]["rating"]["high"] }</FilterBtn>
                        <FilterBtn handleClick={() => getSort("grade")} active={sort == "grade"}>{ Common.lines[lang]["rating"]["low"] }</FilterBtn>
                    </div>
                </div>
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
                                lang={lang}
                                handleSelect={() => setSelected(item["id"], item["selected"])}
                                handleDelete={() => deleteFeedback(item["id"])}
                            />
                        ))
                    }
                </CommentsLayout>
            </div>
        </Container>
    );
}