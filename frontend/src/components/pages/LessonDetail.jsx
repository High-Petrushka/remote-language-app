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

export function LessonDetail() {
    const [lessonInfo, setLessonInfo] = useState({});
    const params = useParams();

    async function getLessonInfo() {
        axios.get(`${Common.url}/lessons/${Number(params.lessonId)}`)
        .then((res) => {
            setLessonInfo(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        getLessonInfo();
    }, []);

    return (
        <Container>
            <LessonDetailLayout>
                <LessonTitleLayout>
                    <div className="grow">
                        <Hero level={2}>{ lessonInfo["title"] }</Hero>
                    </div>
                    <div className="grow-[2]">
                        <PlainText>{ lessonInfo["description"] }</PlainText>
                    </div>
                </LessonTitleLayout>
                <div>
                    <div></div>
                    <div></div>
                </div>
                <LessonTestLayout>
                    <Hero level={2}>Lesson's Test</Hero>
                </LessonTestLayout>
            </LessonDetailLayout>
        </Container>
    );
}