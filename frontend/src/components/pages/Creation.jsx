import { useEffect, useRef, useState } from "react";

import { ProfileBioInput } from "../interaction/ProfileBioInput";
import { Container } from "../layout/Container";
import { LessonBodyLayout } from "../layout/LessonBodyLayout";
import { LessonContentLayout } from "../layout/LessonContentLayout";
import { LessonDetailLayout } from "../layout/LessonDetailLayout";
import { LessonTestLayout } from "../layout/LessonTestLayout";
import { LessonTitleLayout } from "../layout/LessonTitleLayout";
import { Hero } from "../Typography/Hero";
import { FilterTitle } from "../Typography/FilterTitle";
import { FilterBtn } from "../interaction/FilterBtn";
import { CreationInputLayout } from "../layout/CreationInputLayout";
import { Button } from "../interaction/Button";
import { TestCreationItemLayout } from "../layout/TestCreationItemLayout";
import { PopMessage } from "../interaction/PopMessage";
import { TestCreationInput } from "../interaction/TestCreationInput";
import { RadioInput } from "../interaction/RadioInput";
import axios from "axios";
import { useNavigate } from "react-router";
import { Common } from "../../Context/Common";

export function Creation() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("1");
    const [language, setLanguage] = useState("1");
    const [poster, setPoster] = useState("");
    const [text, setText] = useState("");
    const [test, setTest] = useState(false);
    const [taskSet, setTaskSet] = useState([]);

    const [message, setMessage] = useState("");
    const [hidden, setHidden] = useState(true);

    const newTaskId = useRef(2);

    const makeTest = () => {
        if (!test) {
            // setTaskSet(new Array(2).fill({
            //     question: "",
            //     answer: "",
            //     variant_a: "",
            //     variant_b: "",
            //     variant_c: "",
            //     variant_d: "",
            // }));
            setTaskSet([{
                id: 0,
                question: "",
                answer: "",
                variant_a: "",
                variant_b: "",
                variant_c: "",
                variant_d: "",
            }, {
                id: 1,
                question: "",
                answer: "",
                variant_a: "",
                variant_b: "",
                variant_c: "",
                variant_d: "",
            }]);
        } else {
            setTaskSet([]);
        }
    }

    const addTask = () => {
        if (taskSet.length < 10) {
            setTaskSet([...taskSet, {
                id: newTaskId.current,
                question: "",
                answer: "",
                variant_a: "",
                variant_b: "",
                variant_c: "",
                variant_d: "",
            }]);
            newTaskId.current++;
        } else {
            setMessage("Test can contain no more than 10 tasks.");
            setHidden(false);
            setTimeout(() => {
                setHidden(true);
            }, 5000);
        }
    }

    const removeTask = (targetId) => {
        if (taskSet.length < 3) {
            setMessage(Common.lines.en.error.testMin);
            setHidden(false);
            setTimeout(() => {
                setHidden(true);
            }, 5000);
        } else {
            setTaskSet(taskSet.filter((task) => task["id"] !== targetId));
            console.log("Done")
        }
    }

    async function createLesson(url) {
        let formData = new FormData();
        poster ? formData.append("poster", document.getElementById("poster").files[0]) : null;
        test ? formData.append("test", JSON.stringify({task_set: taskSet.map(item => {
            return {
                question: item["question"],
                answer: item["answer"],
                variant_a: item["variant_a"],
                variant_b: item["variant_b"],
                variant_c: item["variant_c"],
                variant_d: item["variant_d"],
            }
        })})) : null;
        formData.append("title", title);
        formData.append("description", description);
        formData.append("type", category);
        formData.append("language", language);
        formData.append("text", text);

        axios.post(url, formData, {headers: {"Authorization": token}})
        .then(() => {
            setMessage("Created successfully.");
            setHidden(false);
            setTimeout(() => {
                setHidden(true);
            }, 5000);

            setTitle("");
            setDescription("");
            setCategory("1");
            setLanguage("1");
            setText("");
            setPoster("");
            setTest(false);
            setTaskSet([]);
        })
        .catch((err) => {
            console.log(err)
            if (axios.isAxiosError(err)) {
                if (err.response.status === 400) {
                    setMessage("Fill all fields!")
                    setHidden(false);
                    setTimeout(() => {
                        setHidden(true);
                    }, 5000);
                }
            } else {
                setMessage(Common.networkErrorMsg);
                setHidden(false);
                setTimeout(() => {
                    setHidden(true);
                }, 5000);
            }
        });
    }

    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    }, []);

    return (
        <Container>
            <LessonDetailLayout>
                <LessonTitleLayout>
                    <div className="min-h-50 flex flex-col gap-2">
                        <Hero level={6}>Title</Hero>
                        <ProfileBioInput
                            id="title"
                            value={title}
                            placeholder={"Lesson's title..."}
                            handleChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="min-h-50 flex flex-col gap-2">
                        <Hero level={6}>Description</Hero>
                        <ProfileBioInput
                            id="description"
                            value={description}
                            placeholder={"Lesson's description..."}
                            handleChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </LessonTitleLayout>
                <LessonContentLayout>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <FilterTitle>CATEGORY</FilterTitle>
                            <div className="flex gap-2">
                                <FilterBtn handleClick={() => setCategory("1")} active={category === "1"}>reading</FilterBtn>
                                <FilterBtn handleClick={() => setCategory("2")} active={category === "2"}>grammar</FilterBtn>
                                <FilterBtn handleClick={() => setCategory("3")} active={category === "3"}>speaking</FilterBtn>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2 flex-wrap">
                                <FilterBtn handleClick={() => setLanguage("1")} active={language === "1"}>english</FilterBtn>
                                <FilterBtn handleClick={() => setLanguage("2")} active={language === "2"}>german</FilterBtn>
                                <FilterBtn handleClick={() => setLanguage("3")} active={language === "3"}>french</FilterBtn>
                                <FilterBtn handleClick={() => setLanguage("4")} active={language === "4"}>chinese</FilterBtn>
                                <FilterBtn handleClick={() => setLanguage("5")} active={language === "5"}>japanese</FilterBtn>
                            </div>
                            <FilterTitle>LANGUAGE</FilterTitle>
                        </div>
                    </div>
                    <LessonBodyLayout>
                        <CreationInputLayout>
                            <Hero level={6}>Poster</Hero>
                            {
                                poster ?
                                    <img src={poster ? URL.createObjectURL(document.getElementById("poster").files[0]) : "/src/assets/icons/lesson-default.svg"} alt="User poster image" className="w-[min(50vw,400px)] mx-auto" />
                                :
                                    <img src="/src/assets/icons/lesson-default.svg" alt="Default poster image" className="w-[min(50vw,400px)] mx-auto" />
                            }
                            <div className="pt-6 flex items-center justify-between w-[min(392px,100%)] mx-auto">
                                <input
                                    type="file"
                                    id="poster"
                                    value={poster}
                                    accept="image/*"
                                    className="w-50 cursor-pointer active:outline active:outline-zinc-900"
                                    onChange={(e) => setPoster(e.target.value)}
                                />
                                <img src="/src/assets/icons/save.svg" alt="File icon" />
                            </div>
                        </CreationInputLayout>
                        <div className="min-h-50 flex flex-col gap-2">
                            <Hero level={6}>Text</Hero>
                            <ProfileBioInput
                                id="text"
                                value={text}
                                placeholder={"Lesson's text..."}
                                handleChange={(e) => setText(e.target.value)}
                            />
                        </div>
                    </LessonBodyLayout>
                </LessonContentLayout>
                <LessonTestLayout test={true}>
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                        <Hero level={2}>Lesson's Test</Hero>
                        <div className={test ? "grid grid-cols-2 gap-2" : ""}>
                        {
                            test ?
                                <Button type="button" handleClick={() => addTask()}>Add Task</Button>
                            :
                                null
                        }
                        <Button type="button" handleClick={() => {setTest(!test); makeTest()}}>{!test ? "Create Test" : "Remove Test"}</Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {
                            taskSet.map((item, index) => (
                                <TestCreationItemLayout key={index}>
                                    <CreationInputLayout>
                                        <div className="flex items-center justify-between">
                                            <Hero level={6}>Question</Hero>
                                            <img
                                                src="/src/assets/icons/trash.svg"
                                                alt="Trash image"
                                                role="button"
                                                className="cursor-pointer"
                                                onClick={() => removeTask(item["id"])}
                                            />
                                        </div>
                                        <TestCreationInput 
                                            value={taskSet[index]["question"]}
                                            placeholder="Task question..."
                                            handleChange={(e) => {
                                                setTaskSet(taskSet.map((task, i) => {
                                                    if (i === index) {
                                                        return {...task, question: e};
                                                    } else {
                                                        return task;
                                                    }
                                                }));
                                            }}
                                        />
                                    </CreationInputLayout>
                                    <CreationInputLayout>
                                        <Hero level={6}>Answer</Hero>
                                        <TestCreationInput 
                                            value={taskSet[index]["answer"]}
                                            placeholder="Task answer"
                                            handleChange={(e) => {
                                                setTaskSet(taskSet.map((task, i) => {
                                                    if (i === index) {
                                                        return {...task, answer: e}
                                                    } else {
                                                        return task;
                                                    }
                                                }))
                                            }}
                                        />
                                    </CreationInputLayout>
                                    <div className="flex flex-col gap-2 mt-auto">
                                        <div className="flex items-center gap-4">
                                            <RadioInput active={false} handleClick={() => null}>A</RadioInput>
                                            <TestCreationInput 
                                                value={taskSet[index]["variant_a"]}
                                                placeholder="Choice A..."
                                                handleChange={(e) => {
                                                    setTaskSet(taskSet.map((task, i) => {
                                                        if (i === index) {
                                                            return {...task, variant_a: e};
                                                        } else {
                                                            return task;
                                                        }
                                                    }));
                                                }}
                                            />
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <RadioInput active={false} handleClick={() => null}>B</RadioInput>
                                            <TestCreationInput 
                                                value={taskSet[index]["variant_b"]}
                                                placeholder="Choice B..."
                                                handleChange={(e) => {
                                                    setTaskSet(taskSet.map((task, i) => {
                                                        if (i === index) {
                                                            return {...task, variant_b: e};
                                                        } else {
                                                            return task;
                                                        }
                                                    }));
                                                }}
                                            />
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <RadioInput active={false} handleClick={() => null}>C</RadioInput>
                                            <TestCreationInput 
                                                value={taskSet[index]["variant_c"]}
                                                placeholder="Choice C..."
                                                handleChange={(e) => {
                                                    setTaskSet(taskSet.map((task, i) => {
                                                        if (i === index) {
                                                            return {...task, variant_c: e};
                                                        } else {
                                                            return task;
                                                        }
                                                    }));
                                                }}
                                            />
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <RadioInput active={false} handleClick={() => null}>D</RadioInput>
                                            <TestCreationInput 
                                                value={taskSet[index]["variant_d"]}
                                                placeholder="Choice D..."
                                                handleChange={(e) => {
                                                    setTaskSet(taskSet.map((task, i) => {
                                                        if (i === index) {
                                                            return {...task, variant_d: e}
                                                        } else {
                                                            return task;
                                                        }
                                                    }));
                                                }}
                                            />
                                        </div>
                                    </div>
                                </TestCreationItemLayout>
                            ))
                        }
                    </div>
                </LessonTestLayout>
                <Button type="button" handleClick={() => createLesson(`${Common.url}/lessons/`)}>Create Lesson</Button>
            </LessonDetailLayout>
            <PopMessage msgText={message} hidden={hidden} />
        </Container>
    );
}