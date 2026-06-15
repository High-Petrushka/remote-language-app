export function HomeTitleLayout({ children }) {
    return (
        <div className="relative lg:p-6 grid grid-cols-1 xl:grid-cols-2 overflow-hidden">
            { children }
        </div>
    );
}