import { ErrorText } from "../Typography/ErrorText";

export function TextInput({ id, value, placeholder, handleChange, isErr, errMsg }) {
    return (
        <>
        <textarea
            id={id}
            name={id}
            value={value}
            placeholder={placeholder}
            onChange={e => handleChange(e)}
            className={
                isErr ?
                    "h-full w-full p-1 text-[16px] lg:text-lg border-b border-red-500 focus:outline focus:outline-red-500"
                :
                    "h-full w-full p-1 text-[16px] lg:text-lg border-b border-zinc-900 focus:outline focus:outline-zinc-900"
            }
        ></textarea>
        <div style={isErr ? {"display": "block"} : {"display": "none"}}>
            <ErrorText>{ errMsg }</ErrorText>
        </div>
        </>
    )
}