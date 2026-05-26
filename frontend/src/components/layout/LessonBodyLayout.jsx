export function LessonBodyLayout({ children }) {
    return (
        <div className="grid grid-cols-1 gap-y-6 gap-x-24 lg:grid-cols-2">
            { children }
        </div>
    );
}