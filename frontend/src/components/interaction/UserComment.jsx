import { Link } from "react-router";
import { Hero } from "../Typography/Hero";

export function UserComment({ id, userId, lessonId, body, userAvatar, userName, handleClick, lessonAuthorId }) {
    const curUser = localStorage.getItem("userId");

    return (
        <div className="border-b border-zinc-900 pb-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                    {
                        userAvatar ?
                            <img src={userAvatar} alt="User avatar" className="w-12.5 aspect-square rounded-full" />
                        :
                            <img src="/assets/icons/user.svg" alt="User avatar" className="w-12.5 aspect-square rounded-full" />
                    }
                    <Link to={`/profile/${userId}`}>
                        <Hero level={6}>{userName}</Hero>
                    </Link>
                </div>
                {
                    curUser && (curUser == userId || curUser == 1 || curUser == lessonAuthorId) ?
                        <img
                            src="/assets/icons/trash.svg"
                            alt="Trash icon" role="button"
                            className="cursor-pointer"
                            onClick={() => handleClick(id, lessonId)}
                        />
                    :
                        null
                }
            </div>
            <div>
                { body }
            </div>
        </div>
    );
}