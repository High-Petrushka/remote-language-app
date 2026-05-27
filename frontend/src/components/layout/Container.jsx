export function Container({ children }) {
    return (
        <section className="w-[min(1280px,100%)] my-0 mx-auto px-4 xl:px-0">
            { children }
        </section>
    )
}