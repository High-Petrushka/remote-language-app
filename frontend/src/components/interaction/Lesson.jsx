import { Link } from "react-router";

import { Bage } from "../Typography/Bage";
import { Hero } from "../Typography/Hero";
import { AddInfo } from "../Typography/AddInfo";

import { getLessonDate } from "../../Context/getLessonDate";

export function Lesson({ id, title, type, language, description, poster, author, created, owner_id }) {
    return (
        <div className="flex flex-col gap-8 p-7 border-l border-b border-r first:border-t md:border-r-0 md:last:border-r md:nth-[2]:border-t xl:nth-[3]:border-t xl:nth-[3n]:border-r xl:last:border-r border-zinc-900">
            <div className="flex items-center justify-between">
                <p>{ getLessonDate(created) }</p>
                <div className="flex gap-2">
                    <Bage>{ type }</Bage>
                    <Bage>{ language }</Bage>
                </div>
            </div>
            {
                poster ?
                    <img src={poster} alt="Lesson poster" className="w-62.5 h-62.5 mx-auto aspect-square rounded-md" />
                :
                    <img src="/src/assets/icons/lesson-default.svg" alt="Lesson poster" className="w-62.5 h-62.5 mx-auto aspect-square" />
            }
            <div className="flex flex-col gap-3">
                <Hero level={5}>{ title }</Hero>
                <p className="text-[16px] line-clamp-5 leading-[180%]">{ description }</p>
            </div>
            <div className="flex items-center justify-between mt-auto">
                <Link to={`/profile/${owner_id}/`}>
                    <AddInfo title="Author">{ author }</AddInfo>
                </Link>
                <Link to={`/lesson/${id}/`} className="group flex items-center">
                    <span className="text-[16px] text-indigo-500 font-medium">Study</span>
                    <img src="/src/assets/icons/colored-arrow-right.svg" className="group-hover:translate-x-2 transition-transform duration-150" />
                </Link>
            </div>
        </div>
    );
}