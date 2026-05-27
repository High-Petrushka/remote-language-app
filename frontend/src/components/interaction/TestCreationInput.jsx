export function TestCreationInput({ value, placeholder, handleChange }) {
    return (
        <input 
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full text-[16px] lg:text-lg border-b border-zinc-900 border-solid focus:outline focus:outline-zinc-900"
        />
    );
}