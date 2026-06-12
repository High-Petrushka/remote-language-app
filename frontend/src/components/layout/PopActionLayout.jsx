export function PopActionLayout({ children, hidden }) {
    return (
        <div className="flex items-center justify-center absolute top-0 right-0 w-full h-full px-4 overflow-hidden bg-zinc-900/90 backdrop-blur-sm" style={hidden ? {"display": "none"} : {"display": "flex"}}>
            { children }
        </div>
    );
}