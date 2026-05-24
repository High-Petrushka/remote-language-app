export function ProfileBioInput({ id, value, handleChange }) {
    return (
        <textarea
            id={id}
            name={id}
            value={value}
            placeholder="Your bio..."
            onChange={e => handleChange(e)}
            className="h-full p-1 text-[16px] lg:text-lg border-b border-zinc-900 focus:outline focus:outline-zinc-900"
        ></textarea>
    )
}