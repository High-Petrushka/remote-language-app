export function CookiePopUpLayout({ children }) {
    return (
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            { children }
        </div>
    );
}