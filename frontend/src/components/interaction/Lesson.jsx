import { NavLink } from "react-router";

import { Bage } from "../Typography/Bage";
import { Hero } from "../Typography/Hero";
import { AddInfo } from "../Typography/AddInfo";

import { getLessonDate } from "../../Context/getLessonDate";

export function Lesson({ id, title, type, language, description, poster, author, created }) {
    return (
        <div className="flex flex-col gap-8 p-7 border-l border-b border-r first:border-t md:border-r-0 md:even:border-r md:last:border-r md:nth-[2]:border-t xl:even:border-r-0 xl:nth-[3]:border-t xl:nth-[3n]:border-r border-zinc-900">
            <div className="flex items-center justify-between">
                <p>{ getLessonDate(created) }</p>
                <div className="flex gap-2">
                    <Bage>{ type }</Bage>
                    <Bage>{ language }</Bage>
                </div>
            </div>
            {
                poster ?
                    <img alt="Lesson poster" className="w-62.5 h-62.5 mx-auto aspect-square" />
                :
                    <img src="/src/assets/icons/lesson-default.svg" alt="Lesson poster" className="w-62.5 h-62.5 mx-auto aspect-square" />
            }
            <div className="flex flex-col gap-3">
                <Hero level={5}>{ title }</Hero>
                <p className="text-[16px] line-clamp-5 leading-[180%]">{ description }</p>
            </div>
            <div>
                <AddInfo title="Author">{ author }</AddInfo>
            </div>
        </div>
    );
}