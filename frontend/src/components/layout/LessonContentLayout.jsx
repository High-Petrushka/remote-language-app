export function LessonContentLayout({ children }) {
    return (
        <div className="flex flex-col gap-4 lg:gap-8">
            { children }
        </div>
    );
}