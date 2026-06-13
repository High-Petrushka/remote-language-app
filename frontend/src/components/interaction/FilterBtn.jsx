export function FilterBtn({ children, handleClick, active }) {
    return (
        <div
            onClick={() => handleClick()}
            className={
                active ? 
                    "text-sm font-light w-fit border border-indigo-500 rounded-full px-3 py-1 cursor-pointer bg-indigo-500 text-neutral-50 transition-[background,color] duration-300"
                :
                    "text-sm font-light w-fit text-indigo-500 border border-indigo-500 rounded-full px-3 py-1 cursor-pointer hover:bg-indigo-500 hover:text-neutral-50 transition-[background,color] duration-300"
                }
        >
            { children.toLowerCase() }
        </div>
    );
}