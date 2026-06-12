export function DangerButton({ children, type, handleClick }) {
    return (
        <button
            onClick={handleClick}
            className="w-full px-4 py-2 border border-solid border-red-500 rounded-full bg-red-500 text-neutral-50 font-medium hover:bg-transparent hover:text-red-500 transition-[background,color] duration-300"
            type={type}
        >{ children }</button>
    )
}