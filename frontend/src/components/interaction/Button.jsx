export function Button({ children, type, handleClick }) {
    return (
        <button
            onClick={handleClick}
            className="w-full px-4 py-2 border border-solid border-indigo-500 rounded-full bg-indigo-500 text-neutral-50 font-medium hover:bg-transparent hover:text-indigo-500 transition-[background,color] duration-300"
            type={type}
        >{ children }</button>
    )
}