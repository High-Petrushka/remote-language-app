export function LessonTitleLayout({ children }) {
    return (
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-24">
            { children }
        </div>
    );
}