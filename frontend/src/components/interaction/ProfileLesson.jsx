import { AddInfo } from "../Typography/AddInfo";
import { Bage } from "../Typography/Bage";
import { Hero } from "../Typography/Hero";

import { getLessonDate } from "../../Context/getLessonDate";
import { Link } from "react-router";

export function ProfileLesson({ id, title, imgSrc, type, language, lessonDate }) {
    return (
        <div className="p-4 lg:p-8 flex flex-col lg:flex-row gap-12 border-b border-l border-r border-zinc-900 first:border-t lg:even:border-l-0 lg:nth-[2]:border-t">
            <div>
                {
                    imgSrc ?
                        <img src={imgSrc} alt="Lesson poster" className="w-37.5 h-auto max-w-37.5 mx-auto" />
                    :
                        <img src="/src/assets/icons/lesson-default.svg" alt="Lesson poster" className="w-37.5 h-auto max-w-37.5 mx-auto" />
                }
            </div>
            <div className="grow flex flex-col justify-center gap-4">
                <Link to={`/lesson/${id}`}>
                    <Hero level={5}>{ title }</Hero>
                </Link>
                <div className="flex items-center justify-between">
                    <AddInfo title="Date">{ getLessonDate(lessonDate) }</AddInfo>
                    <div className="flex gap-2">
                        <Bage>{ type }</Bage>
                        <Bage>{ language }</Bage>
                    </div>
                </div>
            </div>
        </div>
    );
}