import { Common } from "../../Context/Common";
import { PaginationLayout } from "../layout/PaginationLayout";

export function Pagination({ handleNext, handlePrev, curPage }) {
    let lang = localStorage.getItem("language");

    if (!lang) {
        lang = "en";
    }

    return (
        <div className="py-8">
            <PaginationLayout>
                <button onClick={handlePrev} className="flex items-center gap-1 font-medium cursor-pointer"><img src="/assets/icons/arrow-left.svg" /> { Common.lines[lang]["button"]["prevBtn"] }</button>
                <p className="text-[16px] font-medium">{ curPage }</p>
                <button onClick={handleNext} className="flex items-center gap-1 font-medium cursor-pointer">{ Common.lines[lang]["button"]["nextBtn"] } <img src="/assets/icons/arrow-right.svg" /></button>
            </PaginationLayout>
        </div>
    )
}