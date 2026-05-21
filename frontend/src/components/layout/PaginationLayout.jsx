export function PaginationLayout({ children }) {
    return (
        <div className="w-[min(800px,100%)] mx-auto grid grid-cols-3 gap-1 place-items-center">
            { children }
        </div>
    );
}