
export function HomeHero({ children }) {
    return (
        <h1 className="text-[clamp(72px,18vw,220px)] font-black tracking-tighter leading-none mx-auto w-fit">
            { children }
        </h1>
    );
}