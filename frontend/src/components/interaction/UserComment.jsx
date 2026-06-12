import { Link } from "react-router";
import { Hero } from "../Typography/Hero";
import axios from "axios";
import { Common } from "../../Context/Common";

export function UserComment({ id, userId, lessonId, body, userAvatar, userName, handleClick }) {
    const token = localStorage.getItem("token");
    const curUser = localStorage.getItem("userId");

    async function handleDelete() {
        axios.delete(
            `${Common.url}/lessons/${lessonId}/comments/${id}/`,
            {headers: {"Authorization": token}}
        )
    }
    return (
        <div className="border-b border-zinc-900 pb-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                    <img src="/src/assets/icons/user.svg" alt="User avatar" className="w-[clamp(50px,5vw,80px)] aspect-square" />
                    <Link to={`/profile/${userId}`}>
                        <Hero level={6}>{userName}</Hero>
                    </Link>
                </div>
                {
                    curUser && curUser == userId ?
                        <img
                            src="/src/assets/icons/trash.svg"
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