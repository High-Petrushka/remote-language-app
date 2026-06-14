export function Select({ id, optionList, curVal, handleChange }) {
    return (
        <select
            id={id}
            name={id}
            value={curVal}
            onChange={(e) => {handleChange(e.target.value)}}
            className="w-full cursor-pointer py-2 px-4 rounded-lg border-0 outline-0 hover:bg-zinc-500/10 transition-[background] duration-300 appearance-none"
        >
            {
                JSON.parse(optionList).map((item) => (
                    <option
                        key={item.id} 
                        value={item.value}
                        className="bg-neutral-50 focus:bg-indigo-500 hover:bg-indigo-500 appearance-none"
                    >
                            { item.title }
                        </option>
                ))
            }
        </select>
    )
}