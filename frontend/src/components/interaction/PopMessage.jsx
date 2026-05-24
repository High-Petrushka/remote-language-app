import { PopMessageLayout } from "../layout/PopMessageLayout";

export function PopMessage({ msgText, hidden }) {
    return (
        <div className="fixed py-4 px-4 top-21 bg-zinc-900 transition-[right] duration-1000 ease-linear" style={hidden ? {"right": "-1000px"} : {"right": 0}}>
            <PopMessageLayout>
                <p className="text-neutral-50">{ msgText }</p>
            </PopMessageLayout>
        </div>
    );
}