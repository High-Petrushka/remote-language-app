import { Link } from "react-router";
import { CookiePopUpLayout } from "../layout/CookiePopUpLayout";
import { Button } from "./Button";
import { Common } from "../../Context/Common";

export function CookiePopUp({ handleConfirm }) {
    const isConfirmed = localStorage.getItem("isConfirmed");
    let lang = localStorage.getItem("language");

    if (!lang) {
        lang = "en";
    }
    return (
        <div className="w-[min(1280px,92%)] my-0 px-4 py-4 mx-auto bg-neutral-50 shadow-2xl rounded-md fixed z-10 bottom-4" style={isConfirmed ? {"display": "none"} : {"display": "block"}}>
            <CookiePopUpLayout>
                <div className="flex items-center gap-4">
                    <img src="/assets/icons/cookie.svg" alt="Cookie image " className="min-w-8" />
                    <p>{Common.lines[lang]["home"]["policy"]["text"]} <Link to={"/policy"} className="text-indigo-400 underline">{Common.lines[lang]["home"]["policy"]["call"]}</Link></p>
                </div>
                <div className="w-full lg:w-fit">
                    <Button type="button" handleClick={() => handleConfirm()}>{ Common.lines[lang]["button"]["agreeBtn"] }</Button>
                </div>
            </CookiePopUpLayout>
        </div>
    );
}