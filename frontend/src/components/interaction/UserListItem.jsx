import { Link } from "react-router";
import { Common } from "../../Context/Common";

export function UserListItem({ imgSrc, username, email, link, isActive, handleBlock }) {
    const userId = localStorage.getItem("userId");
    let lang = localStorage.getItem("language");

    if (!lang) {
        lang = "en";
    }


    return (
        <div className="border-b pb-6 border-zinc-900 last:border-b-0 grid grid-cols-[1fr,auto] px-0 lg:px-4 xl:px-8" style={{"gridTemplateColumns": "1fr auto"}}>
            <div className="flex items-center gap-3">
                {
                    imgSrc ? 
                        <img src={imgSrc} className="w-[clamp(50px,10vw,120px)] h-[clamp(50px,10vw,120px)] rounded-full" />
                    :
                        <img src="/assets/icons/user.svg" className="w-[clamp(50px,10vw,120px)] h-auto rounded-full" />
                }
                <h5 className="text-2xl lg:text-3xl font-semibold">{ username }</h5>
            </div>
            <div className="flex items-center justify-end gap-4">
                {
                    userId == 1 && isActive ?
                        <p
                            role="button"
                            className="text-[16px] font-medium text-red-500 cursor-pointer"
                            onClick={handleBlock}
                        >{ Common.lines[lang]["button"]["blockBtn"] }</p>
                    :
                        <p
                            role="button"
                            className="text-[16px] font-medium text-indigo-500 cursor-pointer"
                            style={userId == 1 ? {"display": "block"}: {"display": "none"}}
                            onClick={handleBlock}
                        >{ Common.lines[lang]["button"]["unblockBtn"] }</p>
                }
                {
                    userId != 1 ?
                        <a href={`mailto:${email}`} className="hidden mr-12 lg:flex gap-2 text-[16px] font-extralight"><span className="font-medium">Email</span>{ email }</a>
                    :
                        null
                }
                <Link to={link} className="group flex items-center">
                    <span className="text-[16px] font-medium">{ Common.lines[lang]["button"]["profileBtn"] }</span>
                    <img src="/assets/icons/arrow-right.svg" className="group-hover:translate-x-2 transition-transform duration-150" />
                </Link>
            </div>
        </div>
    );
}