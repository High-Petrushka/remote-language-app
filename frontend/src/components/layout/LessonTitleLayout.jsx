export function LessonTitleLayout({ children }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-6">
            { children }
        </div>
    );
}