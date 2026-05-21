import { Link } from "react-router";

export function UserListItem({ imgSrc, username, email, link }) {
    return (
        <div className="border-b pb-6 border-zinc-900 last:border-b-0 grid grid-cols-2 px-0 lg:px-4 xl:px-8">
            <div className="flex items-center gap-3">
                {
                    imgSrc ? 
                        <img src={imgSrc} className="w-[clamp(50px,10vw,120px)] h-[clamp(50px,10vw,120px)] rounded-full" />
                    :
                        <img src="/src/assets/icons/user.svg" className="w-[clamp(50px,10vw,120px)] h-auto rounded-full" />
                }
                <h5 className="text-2xl lg:text-3xl font-semibold">{ username }</h5>
            </div>
            <div className="flex items-center justify-end gap-16">
                <a href={`mailto:${email}`} className="hidden lg:flex gap-2 text-[16px] font-extralight"><span className="font-medium">Email</span>{ email }</a>
                <Link to={link} className="group flex items-center">
                    <span className="text-[16px] font-medium">About</span>
                    <img src="/src/assets/icons/arrow-right.svg" className="group-hover:translate-x-2 transition-transform duration-150" />
                </Link>
            </div>
        </div>
    );
}