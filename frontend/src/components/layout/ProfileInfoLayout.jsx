export function ProfileInfoLayout({ children }) {
    return (
        <div className="w-[min(100%,1000px)] mx-auto grid grid-cols-1 gap-x-32 gap-y-6 lg:grid-cols-2">
            { children }
        </div>
    );
}