export function ProfileInfoLayout({ children }) {
    return (
        <div className="w-[min(100%,1000px)] mx-auto flex flex-col gap-6 lg:flex-row lg:gap-32">
            { children }
        </div>
    );
}