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
    let lang = localStorage.getItem("language");

    if (!lang) {
        lang = "en";
    }

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
                <DisplayHero>{ Common.lines[lang]["title"]["lessons"] }</DisplayHero>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <FilterTitle>{ Common.lines[lang]["title"]["categories"] }</FilterTitle>
                        <div className="flex gap-2 flex-wrap justify-end">
                            <FilterBtn handleClick={() => {if (category === "1") { setCategory("") } else { setCategory("1") }}} active={category === "1"}>{ Common.lines[lang]["categories"]["reading"] }</FilterBtn>
                            <FilterBtn handleClick={() => category === "2" ? setCategory("") : setCategory("2")} active={category === "2"}>{ Common.lines[lang]["categories"]["grammar"] }</FilterBtn>
                            <FilterBtn handleClick={() => category === "3" ? setCategory("") : setCategory("3")} active={category === "3"}>{ Common.lines[lang]["categories"]["speaking"] }</FilterBtn>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex gap-2 flex-wrap">
                            <FilterBtn handleClick={() => getLanguage("1")} active={language === "1"}>{ Common.lines[lang]["languages"]["en"] }</FilterBtn>
                            <FilterBtn handleClick={() => getLanguage("2")} active={language === "2"}>{ Common.lines[lang]["languages"]["gr"] }</FilterBtn>
                            <FilterBtn handleClick={() => getLanguage("3")} active={language === "3"}>{ Common.lines[lang]["languages"]["fr"] }</FilterBtn>
                            <FilterBtn handleClick={() => getLanguage("4")} active={language === "4"}>{ Common.lines[lang]["languages"]["ch"] }</FilterBtn>
                            <FilterBtn handleClick={() => getLanguage("5")} active={language === "5"}>{ Common.lines[lang]["languages"]["jp"] }</FilterBtn>
                        </div>
                        <FilterTitle>{ Common.lines[lang]["title"]["languages"] }</FilterTitle>
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
                                lang={lang}
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
                    <Hero level={6}>{ Common.lines[lang]["title"]["deleteion"] }</Hero>
                    <p className="text-[16px] lg:text-lg">{ Common.lines[lang]["question"]["lessonDelete"] }</p>
                    </InputLayout>
                    <div className="flex gap-2">
                        <Button
                            type="button"
                            handleClick={() => {
                                setDeleteHidden(true);
                                setLessonToDelete(null);
                                document.querySelector("body").style.overflowY = "scroll";
                            }}
                        >{ Common.lines[lang]["button"]["cancelBtn"] }</Button>
                        <DangerButton
                            type="button"
                            handleClick={() => {
                                deleteLesson(lessonToDelete);
                            }}
                        >{ Common.lines[lang]["button"]["deleteBtn"] }</DangerButton>
                    </div>
                </PopUpBodyLayout>
            </PopActionLayout>
        </Container>
    );
}