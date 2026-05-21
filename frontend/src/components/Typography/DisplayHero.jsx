export function DisplayHero({ children }) {
    return (
        <h1 className="text-[clamp(72px,18vw,268px)] font-black tracking-tighter leading-none mx-auto w-fit">
            { children }
        </h1>
    );
}