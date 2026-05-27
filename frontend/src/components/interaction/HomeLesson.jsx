import { Link } from "react-router";
import { Hero } from "../Typography/Hero";
import { PlainText } from "../Typography/PlainText";
import { AddInfo } from "../Typography/AddInfo";
import { getLessonDate } from "../../Context/getLessonDate";
import { Bage } from "../Typography/Bage";

export function HomeLesson({ id, title, description, type, language, poster, author, author_id, created }) {
    return (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 pb-12 border-b border-b-zinc-900">
            {
                poster ?
                    <img src={poster} alt="Lesson poster" className="min-w-62 mx-auto" />
                :
                    <img src="/src/assets/icons/lesson-default.svg" alt="Lesson poster" className="min-w-62 mx-auto" />
            }
            <div className="flex flex-col justify-between gap-8 grow">
                <div className="flex flex-col gap-4">
                    <Link to={`/lesson/${id}/`}>
                        <Hero level={5}>{ title }</Hero>
                    </Link>
                    <PlainText>{ description }</PlainText>
                </div>
                <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex gap-4">
                        <Link to={`/profile/${author_id}/`}>
                            <AddInfo title="Author">{ author }</AddInfo>
                        </Link>
                        <AddInfo title="Date">{ getLessonDate(created) }</AddInfo>
                    </div>
                    <div className="flex gap-2">
                        <Bage>{ type }</Bage>
                        <Bage>{ language }</Bage>
                    </div>
                </div>
            </div>
        </div>
    );
}