import { Hero } from "../Typography/Hero";
import { ErrorText } from "../Typography/ErrorText";

export function Input({ id, title, type, placeholder, errorText, incorrect, value, handleChange }) {
    return (
        <div className="flex flex-col gap-1.5">
            <Hero level={6}>{ title }</Hero>
            <input
                id={id}
                name={id}
                value={value}
                onChange={(e) => handleChange(e)}
                type={type}
                placeholder={placeholder}
                className={
                    incorrect ?
                    "w-full px-4 py-2 border border-red-500 border-solid rounded-full focus:outline focus:outline-red-500"
                    :
                    "w-full px-4 py-2 border border-zinc-900 border-solid rounded-full focus:outline focus:outline-zinc-900"
                }
            />
            <div style={incorrect && errorText ? {"display": "block"} : {"display": "none"}}>
                <ErrorText>{ errorText }</ErrorText>
            </div>
        </div>
    );
}