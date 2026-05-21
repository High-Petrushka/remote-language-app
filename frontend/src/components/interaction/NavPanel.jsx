import { useContext } from "react";
import { NavContext } from "../../Context/NavContext";
import { NavPanelLayout } from "../layout/NavPanelLayout";
import { NavLinksLayout } from "../layout/NavLinksLayout";
import { MyNavLink } from "./MyNavLink";

export function NavPanel() {
    const {hidden} = useContext(NavContext);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    return (
        <div
            className="fixed z-99 bottom-0 h-[calc(100dvh-51px)] overflow-hidden mt-12.25 bg-white shadow-2xl transition-[width,padding] duration-500 xl:h-full"
            style={hidden ? {"width": "0", "padding": "0", "transitionDelay": "100ms"} : {"width": "248px", "padding": "1rem 1rem", "transitionDelay": "0ms"}}
        >
            <NavPanelLayout>
                <NavLinksLayout>
                    <MyNavLink path="/" iconSrc={"/src/assets/menu/house.svg"}>Home</MyNavLink>
                    <MyNavLink path="/authors" iconSrc={"/src/assets/menu/authors.svg"}>Authors</MyNavLink>
                    {token ? 
                        <MyNavLink path={`/profile/${userId}`} iconSrc={"/src/assets/menu/authors.svg"}>Profile</MyNavLink>
                    :
                    null
                    }
                    {!token ? 
                    <MyNavLink path="/login" iconSrc={"/src/assets/menu/login.svg"}>Login</MyNavLink>
                    : 
                    <MyNavLink path="/login" inverse={true} iconSrc={"/src/assets/menu/logout.svg"}>Logout</MyNavLink>
                    }
                    {!token ? 
                        <MyNavLink path="/registration" iconSrc={"/src/assets/menu/registration.svg"}>Registration</MyNavLink>
                    :
                    null
                    }
                </NavLinksLayout>
                <span className="text-[12px] text-zinc-700 mx-auto">RLang &#174; 2026. All rights reserved.</span>
            </NavPanelLayout>
        </div>
    );
}