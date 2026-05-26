import { useState, useEffect } from "react";
import { useParams } from "react-router";

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
import { TestResult } from "../Typography/TestResult";
import { PopMessage } from "../interaction/PopMessage";
import { TestShield } from "../interaction/TestShield";

export function LessonDetail() {
    const token = localStorage.getItem("token");
    const params = useParams();

    const [lessonInfo, setLessonInfo] = useState({});
    const [testAnswer, setTestAnswer] = useState([]);
    const [testRes, setTestRes] = useState(0);
    const [taskCount, setTaskCount] = useState(0); 

    const [message, setMessage] = useState("");
    const [hidden, setHidden] = useState(true);

    async function getLessonInfo() {
        const config = token ? {headers: {"Authorization": token}} : {}
        axios.get(`${Common.url}/lessons/${Number(params.lessonId)}`, config)
        .then((res) => {
            setLessonInfo(res.data);

            if (res.data["test"]["task_set"]) {
                setTestAnswer(res.data["test"]["task_set"].map(() => ""));
                setTaskCount(res.data["test"]["task_set"].length);
            }
        })
        .catch(() => {
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

            setMessage(`${res.data["message"]} Result: ${res.data["result"]} of ${taskCount}`);
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

    useEffect(() => {
        getLessonInfo();
    }, []);

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
                    <div className="flex items-center justify-between">
                        <div className="flex gap-4 flex-wrap">
                            <AddInfo title="Author">{ lessonInfo["owner"] }</AddInfo>
                            <AddInfo title="Date">{ lessonInfo["created"] ? getLessonDate(lessonInfo["created"]) : "" }</AddInfo>
                        </div>
                        <div className="flex gap-2">
                            <Bage>{ lessonInfo["type"] ? lessonInfo["type"] : "" }</Bage>
                            <Bage>{ lessonInfo["language"] ? lessonInfo["language"] : "" }</Bage>
                        </div>
                    </div>
                    <LessonBodyLayout>
                        <div>
                            {
                                lessonInfo["poster"] ?
                                    <img src={lessonInfo["poster"] ? lessonInfo["poster"] : "/src/assets/icons/lesson-default.svg"} className="w-[min(50vw,400px)] mx-auto" />
                                :
                                    <img src="/src/assets/icons/lesson-default.svg" className="w-[min(50vw,400px)] mx-auto" />
                            }
                        </div>
                        <div>
                            <PlainText>{ lessonInfo["text"] ? lessonInfo["text"] : ""}</PlainText>
                        </div>
                    </LessonBodyLayout>
                </LessonContentLayout>
                {token ? (
                <LessonTestLayout test={lessonInfo["test"] ? lessonInfo["test"] : null}>
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                        <Hero level={2}>Lesson's Test</Hero>
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
                        <Button handleClick={() => handleTest()}>Check Test</Button>
                    </div>
                    {!token ? <TestShield /> : null}
                </LessonTestLayout>)
                : null
                    }
            </LessonDetailLayout>
            <PopMessage msgText={message} hidden={hidden} />
        </Container>
    );
}