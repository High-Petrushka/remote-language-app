export function ErrorText({ children }) {
    return (
        <span className="text-[15px] font-medium text-red-500">
            { children }
        </span>
    );
}