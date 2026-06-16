import { Hero } from "../Typography/Hero";
import { Button } from "./Button";

export function HomeFeature({ title, text, imgSrc, btnText, handleBtn }) {
    return (
        <div className="grid grid-cols-[auto_1fr] gap-3">
            <img src={imgSrc} alt="Feature icon" className="w-8 pt-1" />
            <div className="flex flex-col">
                <Hero level={6}>{ title }</Hero>
                <p className="pt-2 pb-4 text-zinc-900/80">{ text }</p>
                <div className="self-start">
                    <Button type="button" handleClick={() => handleBtn()}>{ btnText }</Button>
                </div>
            </div>
        </div>
    );
}