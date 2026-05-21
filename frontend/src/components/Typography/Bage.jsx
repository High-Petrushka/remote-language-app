export function Bage({ children }) {
    return (
        <div className="text-sm font-light w-fit border border-zinc-900 rounded-full px-3 py-1">
            { children.toLowerCase() }
        </div>
    );
}