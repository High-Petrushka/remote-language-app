import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router";

import axios from "axios";

import { Common } from "../../Context/Common";

import { Container } from "../layout/Container";
import { Hero } from "../Typography/Hero";
import { LessonDetailLayout } from "../layout/LessonDetailLayout";
import { PlainText } from "../Typography/PlainText";
import { LessonTestLayout } from "../layout/LessonTestLayout";
import { LessonTitleLayout } from "../layout/LessonTitleLayout";
import { Bage } from "../Typography/Bage";
import { AddInfo } from "../Typography/AddInfo";
import { getLessonDate } from "../../Context/getLessonDate";
import { LessonContentLayout } from "../layout/LessonContentLayout";
import { LessonBodyLayout } from "../layout/LessonBodyLayout";
import { TestItem } from "../interaction/TestItem";
import { Button } from "../interaction/Button";
import { DangerButton } from "../interaction/DangerButton";
import { TestResult } from "../Typography/TestResult";
import { PopMessage } from "../interaction/PopMessage";
import { TestShield } from "../interaction/TestShield";
import { Like } from "../interaction/Like";
import { PopActionLayout } from "../layout/PopActionLayout";
import { TextInput } from "../interaction/TextInput";
import { InputLayout } from "../layout/InputLayout";
import { ListLayout } from "../layout/ListLayout";
import { UserComment } from "../interaction/UserComment";
import { CommentsLayout } from "../layout/CommentsLayout";

export function LessonDetail() {
    const token = localStorage.getItem("token");
    const params = useParams();
    let lang = localStorage.getItem("language");

    if (!lang) {
        lang = "en";
    }

    const [lessonInfo, setLessonInfo] = useState({});
    const [testAnswer, setTestAnswer] = useState([]);
    const [testRes, setTestRes] = useState(0);
    const [taskCount, setTaskCount] = useState(0); 
    const [liked, setLiked] = useState(false);

    const [comments, setComments] = useState([]);
    const [commentHidden, setCommentHidden] = useState(true);
    const [userComment, setUserComment] = useState("");
    const [commentError, setCommentError] = useState(false);
    const [added, setAdded] = useState(false);

    const [message, setMessage] = useState("");
    const [hidden, setHidden] = useState(true);

    async function getLessonInfo() {
        const config = token ? {headers: {"Authorization": token}} : {}
        axios.get(`${Common.url}/lessons/${Number(params.lessonId)}`, config)
        .then((res) => {
            setLessonInfo(res.data);
            setLiked(res.data["liked"]);

            if (res.data["test"]) {
                setTestAnswer(res.data["test"]["task_set"].map(() => ""));
                setTaskCount(res.data["test"]["task_set"].length);
            }
        })
        .catch((err) => {
            console.log(err)
            setMessage(Common.networkErrorMsg);
            setHidden(false);
            setTimeout(() => {
                setHidden(true);
            }, 5000)
        });
    }

    async function handleTest() {
        axios.post(
            `${Common.url}/lessons/${params.lessonId}/check_test/${lessonInfo["test"]["id"]}/`,
            {"test_answer": testAnswer},
            {headers: {"Authorization": token}}
        )
        .then((res) => {
            setTestRes(res.data["result"]);
            setTestAnswer(testAnswer.map(() => ""));

            setMessage(`${res.data["message"]} Result: ${res.data["result"]} ${Common.lines[lang]["title"]["of"]} ${taskCount}`);
            setHidden(false);
            setTimeout(() => {
                setHidden(true);
            }, 5000);
        })
        .catch((err) => {
            if (axios.isAxiosError(err)) {
                if (err.response.status === 400) {
                    setMessage("Please, fill all the answers.");
                } else if (err.response.status === 500) {
                    setMessage(Common.networkErrorMsg);
                }
            } else {
                setMessage(Common.networkErrorMsg)
            }
            setHidden(false);
            setTimeout(() => {
                setHidden(true);
            }, 5000);
        });
    }

    async function getComments() {
        axios.get(
            `${Common.url}/lessons/${Number(params["lessonId"])}/comments/`
        )
        .then(res => {
            setComments(res.data);
        })
        .catch(err => {
            console.log(err);
            setMessage(Common.networkErrorMsg);
            setHidden(false);
            setTimeout(() => {
                setHidden(true);
            }, 5000);
        });
    }

    async function handleComment() {
        if (userComment) {
            axios.post(
                `${Common.url}/lessons/${Number(params["lessonId"])}/comments/`,
                {"body": userComment},
                {headers: {"Authorization": token}}
            )
            .then(res => {
                setUserComment("");
                setCommentHidden(true);
                document.querySelector("body").style.overflowY = "scroll";
            })
            .catch(err => {
                console.log(err);
            });
        } else {
            setCommentError(true);
        }
    }

    async function deleteComment(commentId, lessonId) {
        axios.delete(
            `${Common.url}/lessons/${lessonId}/comments/${commentId}/`,
            {headers: {Authorization: token}},
        )
        .then(() => {
            setAdded(!added);
        });
    }

    async function handleLike() {
        if (token) {
            if (!liked) {
                axios.post(`${Common.url}/lessons/${params.lessonId}/like/`, {}, {headers: {"Authorization": token}})
                .then((res) => {
                    getLessonInfo()
                    setLiked(res.data["liked"]);
                })
            } else {
                axios.post(`${Common.url}/lessons/${params.lessonId}/remove_like/`, {}, {headers: {"Authorization": token}})
                .then((res) => {
                    getLessonInfo()
                    setLiked(res.data["liked"]);
                })
            }
        } else {
            setMessage(Common.authErrorMsg);
            setHidden(false);
            setTimeout(() => {
                setHidden(true);
            }, 5000);
        }
        
    }

    useEffect(() => {
        getLessonInfo();
        getComments();
    }, [added]);

    return (
        <Container>
            <LessonDetailLayout>
                <LessonTitleLayout>
                    <div>
                        <Hero level={2}>{ lessonInfo["title"] }</Hero>
                    </div>
                    <div>
                        <PlainText>{ lessonInfo["description"] }</PlainText>
                    </div>
                </LessonTitleLayout>
                <LessonContentLayout>
                    <LessonBodyLayout>
                        <div>
                            {
                                lessonInfo["poster"] ?
                                    <img src={lessonInfo["poster"] ? lessonInfo["poster"] : "/src/assets/icons/lesson-default.svg"} className="w-[min(50vw,400px)] mx-auto rounded-md" />
                                :
                                    <img src="/src/assets/icons/lesson-default.svg" className="w-[min(50vw,400px)] mx-auto" />
                            }
                        </div>
                        <div>
                            <PlainText>{ lessonInfo["text"] ? lessonInfo["text"] : ""}</PlainText>
                        </div>
                    </LessonBodyLayout>
                    <div className="flex items-end justify-between">
                        <div className="flex gap-4 flex-wrap items-center">
                            <Link to={`/profile/${lessonInfo["owner_id"]}/`}>
                                <AddInfo title={Common.lines[lang]["title"]["author"]}>{ lessonInfo["owner"] }</AddInfo>
                            </Link>
                            <AddInfo title={Common.lines[lang]["title"]["date"]}>{ lessonInfo["created"] ? getLessonDate(lessonInfo["created"]) : "" }</AddInfo>
                            <div className="flex gap-1">
                                <Like active={liked} handleClick={() => handleLike()} />
                                { lessonInfo["likes_count"] ? lessonInfo["likes_count"] : 0 }
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Bage>{ lessonInfo["type"] ? Common.lines[lang]["categories"][lessonInfo["type"]] : "" }</Bage>
                            <Bage>{ lessonInfo["language"] ? Common.lines[lang]["lessonLang"][lessonInfo["language"]] : "" }</Bage>
                        </div>
                    </div>
                </LessonContentLayout>
                {token ? (
                <LessonTestLayout test={lessonInfo["test"] ? lessonInfo["test"] : null}>
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                        <Hero level={2}>{Common.lines[lang]["title"]["test"]}</Hero>
                        <TestResult
                            oldRes={lessonInfo["result"] ? lessonInfo["result"] : 0}
                            newRes={testRes}
                            tasksAmount={taskCount}
                        />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {
                            lessonInfo["test"] ?
                            lessonInfo["test"]["task_set"].map((task, taskIndex) => (
                                <TestItem
                                    key={task["id"]}
                                    question={task["question"]}   
                                    variant_a={task["variant_a"]}
                                    variant_b={task["variant_b"]}
                                    variant_c={task["variant_c"]}
                                    variant_d={task["variant_d"]}
                                    handleAnswer={(answer) => setTestAnswer(testAnswer.map((item, itemIndex) => {
                                        if (taskIndex === itemIndex) {
                                            return answer;
                                        } else {
                                            return item;
                                        }
                                    }))}
                                    answer={testAnswer[taskIndex]}
                                />
                            ))
                            :
                                ""
                        }
                    </div>
                    <div className="w-[min(400px,100%)] ml-auto">
                        <Button handleClick={() => handleTest()}>{ Common.lines[lang]["button"]["checkTestBtn"] }</Button>
                    </div>
                    {!token ? <TestShield /> : null}
                </LessonTestLayout>)
                : null
                    }
                <LessonTestLayout test={true}>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <Hero level={2}>{ Common.lines[lang]["title"]["comments"] }</Hero>
                        <div className="w-[min(400px,100%)] ml-auto" style={!token ? {"display": "none"} : {"display": "flex"}}>
                            <Button handleClick={() => {
                                window.scrollTo(0, 0);
                                document.querySelector("body").style.overflow = "hidden";
                                setCommentHidden(false);
                            }}>{ Common.lines[lang]["button"]["addCommentBtn"] }</Button>
                        </div>
                    </div>
                    <CommentsLayout>
                        {
                            comments.length != 0 ?
                                comments.map((comment) => (
                                    <UserComment
                                        key={comment["id"]}
                                        id={comment["id"]}
                                        userId={comment["author"]["id"]}
                                        lessonId={comment["lesson"]}
                                        body={comment["body"]}
                                        userName={comment["author"]["username"]}
                                        userAvatar={comment["author"]["avatar"]}
                                        lessonAuthorId={lessonInfo["owner_id"]}
                                        handleClick={deleteComment}
                                    />
                                ))
                            :
                                null
                        }
                    </CommentsLayout>
                </LessonTestLayout>
            </LessonDetailLayout>
            <PopMessage msgText={message} hidden={hidden} />
            <PopActionLayout hidden={commentHidden}>
                <div className="bg-neutral-50 rounded-md w-[min(400px,100%)] py-5 px-6 flex flex-col gap-8">
                    <InputLayout>
                        <Hero level={6}>{ Common.lines[lang]["title"]["comment"] }</Hero>
                        <TextInput
                            id="userComment"
                            value={userComment}
                            placeholder={Common.lines[lang]["placeholder"]["commentInput"]}
                            handleChange={(e) => {
                                setUserComment(e.target.value)
                                setCommentError(false);
                            }}
                            isErr={commentError}
                            errMsg={Common.lines[lang]["error"]["empty"]}
                        />
                    </InputLayout>
                    <div className="flex gap-2">
                        <DangerButton type="button" handleClick={() => {
                            document.querySelector("body").style.overflowY = "scroll";
                            setCommentHidden(true);
                            setUserComment("");
                            setCommentError(false);
                        }}>{Common.lines[lang]["button"]["cancelBtn"]}</DangerButton>
                        <Button type="button" handleClick={() => {
                            handleComment();
                            setAdded(!added);
                        }}>{Common.lines[lang]["button"]["sendBtn"]}</Button>
                    </div>
                </div>
            </PopActionLayout>
        </Container>
    );
}