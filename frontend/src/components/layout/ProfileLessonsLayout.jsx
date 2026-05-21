export function ProfileLessonLayout({ children, lessons }) {
    return (
        <div className="flex flex-col gap-6 lg:gap-9 pt-8 border-t border-zinc-900" style={lessons ? {"display": "flex"} : {"display": "none"}}>
            { children }
        </div>
    );
}