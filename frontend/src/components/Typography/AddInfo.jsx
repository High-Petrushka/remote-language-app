export function AddInfo({ title, children }) {
    return (
        <div className="flex gap-2 text-sm">
            <span className="font-bold">{ title }</span>
            { children }
        </div>
    );
}