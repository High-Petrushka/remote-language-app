export function ErrorLayout({ children, active }) {
    return (
        <div style={active ? {"display": "block"} : {"display": "none"}}>
            { children }
        </div>
    );
}