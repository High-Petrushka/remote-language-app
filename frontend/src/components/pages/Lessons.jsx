import { useEffect, useState } from "react";

import axios from "axios";

import { Container } from "../layout/Container";
import { DisplayHero } from "../Typography/DisplayHero";

import { Common } from "../../Context/Common";
import { LessonsLayout } from "../layout/LessonsLayout";
import { Lesson } from "../interaction/Lesson";
import { LessonsPageLayout } from "../layout/LessonsPageLayout";
import { FilterTitle } from "../Typography/FilterTitle";
import { FilterBtn } from "../interaction/FilterBtn";
import { PopActionLayout } from "../layout/PopActionLayout";
import { Button } from "../interaction/Button";
import { DangerButton } from "../interaction/DangerButton";
import { PopUpBodyLayout } from "../layout/PopUpBodyLayout";
import { InputLayout } from "../layout/InputLayout";
import { Hero } from "../Typography/Hero";

export function Lessons() {
    const [lessons, setLessons] = useState([]);
    const [category, setCategory] = useState("");
    const [language, setLanguage] = useState("");
    const [deleteHidden, setDeleteHidden] = useState(true);
    const [lessonToDelete, setLessonToDelete] = useState(null);
    const [deleted, setDeleted] = useState(false);

    const token = localStorage.getItem("token");

    const getLanguage = (languageId) => {
        if (language === languageId) {
            setLanguage("");
        } else {
            setLanguage(languageId);
        }
    };

    const deleteLesson = (lessonId) => {
        console.log(lessonId)
        axios.delete(
            `${Common.url}/lessons/${lessonId}/`,
            {headers: {"Authorization": token}},
        )
        .then(() => {
            setDeleteHidden(true);
            setLessonToDelete(null);
            setDeleted(!deleted);
            document.querySelector("body").style.overflowY = "scroll";
        })
        .catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        axios.get(`${Common.url}/lessons/?category=${category}&language=${language}`)
        .then((response) => {
            setLessons(response.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [category, language, deleted]);

    return (
        <Container>
            <LessonsPageLayout>
                <DisplayHero>LESSONS</DisplayHero>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <FilterTitle>CATEGORIES</FilterTitle>
                        <div className="flex gap-2">
                            <FilterBtn handleClick={() => {if (category === "1") { setCategory("") } else { setCategory("1") }}} active={category === "1"}>reading</FilterBtn>
                            <FilterBtn handleClick={() => category === "2" ? setCategory("") : setCategory("2")} active={category === "2"}>grammar</FilterBtn>
                            <FilterBtn handleClick={() => category === "3" ? setCategory("") : setCategory("3")} active={category === "3"}>speaking</FilterBtn>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex gap-2 flex-wrap">
                            <FilterBtn handleClick={() => getLanguage("1")} active={language === "1"}>english</FilterBtn>
                            <FilterBtn handleClick={() => getLanguage("2")} active={language === "2"}>german</FilterBtn>
                            <FilterBtn handleClick={() => getLanguage("3")} active={language === "3"}>french</FilterBtn>
                            <FilterBtn handleClick={() => getLanguage("4")} active={language === "4"}>chinese</FilterBtn>
                            <FilterBtn handleClick={() => getLanguage("5")} active={language === "5"}>japanese</FilterBtn>
                        </div>
                        <FilterTitle>LANGUAGES</FilterTitle>
                    </div>
                </div>
                <LessonsLayout>
                    {
                        lessons.map((lesson) => (
                            <Lesson
                                key={lesson.id}
                                id={lesson.id}
                                title={lesson.title}
                                type={lesson.type}
                                language={lesson.language}
                                description={lesson.description}
                                poster={lesson.poster}
                                author={lesson.owner}
                                created={lesson.created}
                                owner_id={lesson.owner_id}
                                handleDelete={() => {
                                    window.scrollTo(0, 0);
                                    document.querySelector("body").style.overflow = "hidden";
                                    setDeleteHidden(false);
                                    setLessonToDelete(lesson.id);
                                }}
                            />
                        ))
                    }
                </LessonsLayout>
            </LessonsPageLayout>
            <PopActionLayout hidden={deleteHidden} >
                <PopUpBodyLayout>
                    <InputLayout>
                    <Hero level={6}>Deletion</Hero>
                    <p className="text-[16px] lg:text-lg">{ Common.lines.en.question.lessonDelete }</p>
                    </InputLayout>
                    <div className="flex gap-2">
                        <Button
                            type="button"
                            handleClick={() => {
                                setDeleteHidden(true);
                                setLessonToDelete(null);
                                document.querySelector("body").style.overflowY = "scroll";
                            }}
                        >Cancel</Button>
                        <DangerButton
                            type="button"
                            handleClick={() => {
                                deleteLesson(lessonToDelete);
                            }}
                        >Delete</DangerButton>
                    </div>
                </PopUpBodyLayout>
            </PopActionLayout>
        </Container>
    );
}