import { ErrorText } from "../Typography/ErrorText";

export function ProfileInput({ title, id, value, type, placeholder, handleChange, incorrect, errorText }) {
    return (
        <div className="w-full flex items-end gap-2 justify-between">
            <p className="text-[16px] lg:text-lg font-medium">{ title }</p>
            <div className="flex flex-col gap-1.5">
                <input
                    id={id}
                    name={id}
                    value={value}
                    type={type}
                    placeholder={placeholder}
                    onChange={e => handleChange(e)}
                    className={
                        incorrect ?
                        "w-full px-4 py-2 border border-red-500 border-solid rounded-full focus:outline focus:outline-red-500"
                        :
                        "w-62.5 text-[16px] lg:text-lg text-right border-b border-zinc-900 border-solid focus:outline focus:outline-zinc-900"
                    }
                />
                <div style={incorrect && errorText ? {"display": "block"} : {"display": "none"}}>
                    <ErrorText>{ errorText }</ErrorText>
                </div>
            </div>
        </div>
    );
}