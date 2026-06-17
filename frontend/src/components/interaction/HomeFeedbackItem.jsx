import { Link } from "react-router";
import { Hero } from "../Typography/Hero";

export function HomeFeedbackItem({ username, userId, grade, text }) {
    let gradeArray = Array(grade).fill(0)

    return (
        <div className="flex flex-col gap-2 items-center">
            <div className="flex flex-col gap-1 items-center">
                <Hero level={6}><Link to={`/profile/${userId}`}>{ username }</Link></Hero>
                <div className="flex gap-1 justify-center">
                    {
                        gradeArray.map((_, index) => {
                            return <img key={index} src="/src/assets/icons/star.svg" alt="Star icon" className="w-4.5" />
                        })
                    }
                </div>
            </div>
            <div className="text-center">
                <p className="text-[16px]">
                    { text }
                </p>
            </div>
        </div>
    );
}