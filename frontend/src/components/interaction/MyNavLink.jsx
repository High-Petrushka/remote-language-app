import { useContext } from "react";

import { NavLink } from "react-router";
import { NavContext } from "../../Context/NavContext";

export function MyNavLink({ children, path, iconSrc, inverse }) {
    const { setHidden } = useContext(NavContext)
    return (
        <NavLink
            className={!inverse ? "flex gap-2 items-center py-2 px-4 rounded-lg transition-[background] duration-300 hover:bg-zinc-500/10" : "text-red-600 flex gap-2 items-center py-2 px-4 rounded-lg transition-[background] duration-300 hover:bg-zinc-500/10"}
            style={({ isActive }) => isActive ? {"background": "rgba(63, 63, 70, .2)"} : {}}
            to={path} 
            onClick={() => {
                    setHidden(true);
                    if (inverse) {
                        delete localStorage["token"];
                        delete localStorage["userId"];
                    }
                }
            }
        >
            <img src={iconSrc} />
            { children }
        </NavLink>
    );
}