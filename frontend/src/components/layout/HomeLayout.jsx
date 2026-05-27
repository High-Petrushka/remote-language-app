export function HomeLayout({ children }) {
    return (
        <div className="flex flex-col gap-16 lg:gap-24">
            { children }
        </div>
    );
}