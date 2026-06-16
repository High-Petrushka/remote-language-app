export function OutlineBlackButton({ children, type, handleClick }) {
    return (
        <button
            onClick={handleClick}
            className="w-full px-4 py-2 border border-solid border-zinc-900 rounded-full bg-transparent text-zinc-900 font-medium hover:bg-zinc-900 hover:text-neutral-50 transition-[background,color] duration-300"
            type={type}
        >{ children }</button>
    );
}