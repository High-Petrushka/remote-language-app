import { useContext } from "react";
import { NavContext } from "../../Context/NavContext";
import { NavPanelLayout } from "../layout/NavPanelLayout";
import { NavLinksLayout } from "../layout/NavLinksLayout";
import { MyNavLink } from "./MyNavLink";
import { Common } from "../../Context/Common";
import { Select } from "./Select";
import axios from "axios";
import { Link } from "react-router";

export function NavPanel() {
    const {hidden} = useContext(NavContext);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    let lang = localStorage.getItem("language");

    if (!lang) {
        lang = "en"
    }

    const languages = [
        {id: 0, title: `${Common.lines[lang]["languages"]["en"]}`, value: "en"},
        {id: 1, title: `${Common.lines[lang]["languages"]["gr"]}`, value: "gr"},
        {id: 2, title: `${Common.lines[lang]["languages"]["fr"]}`, value: "fr"},
        {id: 3, title: `${Common.lines[lang]["languages"]["ru"]}`, value: "ru"},
    ];

    const handleLanguage = (lang) => {
        localStorage.setItem("language", lang);
        if (token) {
            axios.put(
                `${Common.url}/users/${userId}/`,
                {"language": `${lang}`},
                {headers: {"Authorization": token}},
            )
            .then(() => {
               window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
        } else {
            window.location.reload();
        }
    }

    return (
        <div
            className="fixed z-99 bottom-0 h-[calc(100dvh-51px)] overflow-hidden mt-12.25 bg-white shadow-2xl transition-[width,padding] duration-500 xl:h-full"
            style={hidden ? {"width": "0", "padding": "0", "transitionDelay": "100ms"} : {"width": "248px", "padding": "1rem 1rem", "transitionDelay": "0ms"}}
        >
            <NavPanelLayout>
                <NavLinksLayout>
                    <MyNavLink path="/" iconSrc={"/src/assets/menu/house.svg"}>{Common.lines[lang]["menu"]["home"]}</MyNavLink>
                    <MyNavLink path="/lessons" iconSrc={"/src/assets/menu/lessons.svg"}>{Common.lines[lang]["menu"]["lessons"]}</MyNavLink>
                    <MyNavLink path="/authors" iconSrc={"/src/assets/menu/authors.svg"}>{Common.lines[lang]["menu"]["authors"]}</MyNavLink>
                    <div className="pt-3 mt-3 border-t border-zinc-900">
                        {token && userId == 1 ?
                            <MyNavLink path="/feedback" iconSrc={"/src/assets/menu/feedback.svg"}>{Common.lines[lang]["menu"]["feedback"]}</MyNavLink>
                        :
                        null
                        }
                        {token && !(userId == 1) ?
                            <MyNavLink path="/creation" iconSrc={"/src/assets/menu/plus.svg"}>{Common.lines[lang]["menu"]["create"]}</MyNavLink>
                        :
                            null
                        }
                        {token && !(userId == 1)? 
                            <MyNavLink path={`/profile/${userId}`} iconSrc={"/src/assets/menu/menu-user.svg"}>{Common.lines[lang]["menu"]["profile"]}</MyNavLink>
                        :
                        null
                        }
                        {!token ? 
                        <MyNavLink path="/login" iconSrc={"/src/assets/menu/login.svg"}>{Common.lines[lang]["menu"]["login"]}</MyNavLink>
                        : 
                        <MyNavLink path="/login" inverse={true} iconSrc={"/src/assets/menu/logout.svg"}>{Common.lines[lang]["menu"]["logout"]}</MyNavLink>
                        }
                        {!token ? 
                            <MyNavLink path="/registration" iconSrc={"/src/assets/menu/registration.svg"}>{Common.lines[lang]["menu"]["registration"]}</MyNavLink>
                        :
                        null
                        }
                    </div>
                    <Select id="language" optionList={JSON.stringify(languages)} curVal={lang} handleChange={handleLanguage} />
                </NavLinksLayout>
                <div className="flex flex-col">
                    <Link to={"/policy"} className="text-[12px] text-indigo-500 underline ml-4">Policy</Link>
                    <span className="text-[12px] text-zinc-700 mx-auto">RLang &#174; 2026. All rights reserved.</span>
                </div>
            </NavPanelLayout>
        </div>
    );
}