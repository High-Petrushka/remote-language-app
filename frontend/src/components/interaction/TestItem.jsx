import { Hero } from "../Typography/Hero";
import { PlainText } from "../Typography/PlainText";
import { RadioInput } from "./RadioInput";

export function TestItem({ question, variant_a, variant_b, variant_c, variant_d, handleAnswer, answer }) {
    return (
        <div className="p-4 lg:p-8 flex flex-col gap-8 lg:gap-12 border-b border-l border-r border-zinc-900 first:border-t lg:even:border-l-0 lg:nth-[2]:border-t">
            <Hero level={5}>{ question }</Hero>
            <div className="flex flex-col gap-2 mt-auto">
                <div className="flex items-center gap-2">
                    <RadioInput handleClick={() => handleAnswer(variant_a)} active={answer === variant_a}>A</RadioInput>
                    <PlainText>{ variant_a }</PlainText>
                </div>
                <div className="flex items-center gap-2">
                    <RadioInput handleClick={() => handleAnswer(variant_b)} active={answer === variant_b}>B</RadioInput>
                    <PlainText>{ variant_b }</PlainText>
                </div>
                <div className="flex items-center gap-2">
                    <RadioInput handleClick={() => handleAnswer(variant_c)} active={answer === variant_c}>C</RadioInput>
                    <PlainText>{ variant_c }</PlainText>
                </div>
                <div className="flex items-center gap-2">
                    <RadioInput handleClick={() => handleAnswer(variant_d)} active={answer === variant_d}>D</RadioInput>
                    <PlainText>{ variant_d }</PlainText>
                </div>
            </div>
        </div>
    );
}