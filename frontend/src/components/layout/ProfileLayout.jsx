export function ProfileLayout({ children }) {
    return (
        <div className="grid grid-rows-[repeat(2,auto)] gap-24 relative">
            { children }
        </div>
    );
}