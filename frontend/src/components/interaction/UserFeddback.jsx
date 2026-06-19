import { Button } from "./Button";
import { OutlineBlackButton } from "./OutlineBlackButton";
import { Link } from "react-router";
import { Hero } from "../Typography/Hero";
import { DangerButton } from "./DangerButton";
import { Common } from "../../Context/Common";

export function UserFeedback({ userId, userName, grade, body, selected, lang, handleSelect, handleDelete }) {
    const gradeArray = Array(grade).fill(0);

    return (
        <div className="border-b border-zinc-900 pb-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1 items-start">
                    <Link to={`/profile/${userId}`}>
                        <Hero level={6}>{userName}</Hero>
                    </Link>
                    <div className="flex gap-2">
                        {
                            gradeArray.map((_, index) => (
                                <img key={index} src="/assets/icons/star.svg" alt="Star icon" className="w-4.5" />
                            ))
                        }
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-fit">
                        {
                            selected ?
                                <OutlineBlackButton type="button" handleClick={handleSelect}>{ Common.lines[lang]["button"]["hide"] }</OutlineBlackButton>
                            :
                                <Button type="button" handleClick={handleSelect}>{ Common.lines[lang]["button"]["show"] }</Button>
                        }
                    </div>
                    <div className="w-fit">
                        <img src="/assets/icons/trash.svg" alt="Trash icon" role="button" onClick={handleDelete} className="cursor-pointer" />
                    </div>
                </div>
            </div>
            <div>
                { body }
            </div>
        </div>
    );
}