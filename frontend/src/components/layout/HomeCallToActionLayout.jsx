export function HomeCallToActionLayout({ children }) {
    return (
        <div className="w-[min(600px,100%)] mx-auto flex flex-col gap-6 items-center pt-3 lg:pt-6">
            { children }
        </div>
    );
}