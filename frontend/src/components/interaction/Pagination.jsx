import { PaginationLayout } from "../layout/PaginationLayout";

export function Pagination({ handleNext, handlePrev, curPage }) {
    return (
        <div className="py-8">
            <PaginationLayout>
                <button onClick={handlePrev} className="flex items-center gap-1 font-medium cursor-pointer"><img src="/src/assets/icons/arrow-left.svg" /> Prev</button>
                <p className="text-[16px] font-medium">{ curPage }</p>
                <button onClick={handleNext} className="flex items-center gap-1 font-medium cursor-pointer">Next <img src="/src/assets/icons/arrow-right.svg" /></button>
            </PaginationLayout>
        </div>
    )
}