export function Container({ children }) {
    return (
        <section className="border border-zinc-900 border-dashed w-[min(1280px,100%)] my-0 mx-auto px-4 xl:px-0">
            { children }
        </section>
    )
}