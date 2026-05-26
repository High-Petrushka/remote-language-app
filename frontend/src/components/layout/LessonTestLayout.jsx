export function LessonTestLayout({ children, test }) {
    return (
        <div className="flex flex-col gap-6 lg:gap-9 pt-8 relative border-t border-zinc-900" style={test ? {"display": "flex"} : {"display": "none"}}>
            { children }
        </div>
    );
}