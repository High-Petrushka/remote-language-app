export function PopUpBodyLayout({ children }) {
    return (
        <div className="bg-neutral-50 rounded-md w-[min(400px,100%)] py-5 px-6 flex flex-col gap-8">
            { children }
        </div>
    );
}