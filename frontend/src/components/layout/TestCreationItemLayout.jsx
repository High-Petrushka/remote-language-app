export function TestCreationItemLayout({ children }) {
    return (
        <div className="p-4 lg:p-8 flex flex-col gap-4 lg:gap-6 border-b border-l border-r border-zinc-900 first:border-t lg:even:border-l-0 lg:nth-[2]:border-t">
            { children }
        </div>
    );
}