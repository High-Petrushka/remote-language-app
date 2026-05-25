export function FilterBtn({ children, handleClick, active }) {
    return (
        <div
            onClick={() => handleClick()}
            className={
                active ? 
                    "text-sm font-light w-fit border border-zinc-900 rounded-full px-3 py-1 cursor-pointer bg-zinc-900 text-neutral-50 transition-[background,color] duration-300"
                :
                    "text-sm font-light w-fit border border-zinc-900 rounded-full px-3 py-1 cursor-pointer hover:bg-zinc-900 hover:text-neutral-50 transition-[background,color] duration-300"
                }
        >
            { children.toLowerCase() }
        </div>
    );
}