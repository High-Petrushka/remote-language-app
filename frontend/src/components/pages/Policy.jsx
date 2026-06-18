import { Common } from "../../Context/Common";
import { Container } from "../layout/Container";
import { PolicyLayout } from "../layout/PolicyLayout";
import { DisplayHero } from "../Typography/DisplayHero";
import { Hero } from "../Typography/Hero";

export function Policy() {
    let lang = localStorage.getItem("language");

    if (!lang) {
        lang = "en";
    }

    return (
        <Container>
            <DisplayHero>{ Common.lines[lang]["title"]["policy"] }</DisplayHero>
            <PolicyLayout>
                <div className="flex flex-col gap-4">
                    <Hero level={6}>{ Common.lines[lang]["policy"]["scope"]["title"] }</Hero>
                    <p>{ Common.lines[lang]["policy"]["scope"]["body"] }</p>
                </div>
                <div className="flex flex-col gap-4">
                    <Hero level={6}>{ Common.lines[lang]["policy"]["basis"]["title"] }</Hero>
                    <div className="flex flex-col gap-2">
                        <p>{ Common.lines[lang]["policy"]["basis"]["body"] }</p>
                        <ul className="list-disc list-inside">
                            {
                                Common.lines[lang]["policy"]["basis"]["items"].map((item, index) => (
                                    <li key={index}>{ item }</li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <Hero level={6}>{ Common.lines[lang]["policy"]["data"]["title"] }</Hero>
                    <div className="flex flex-col gap-2">
                        <p>{ Common.lines[lang]["policy"]["data"]["body"] }</p>
                        <ul className="list-disc list-inside">
                            {
                                Common.lines[lang]["policy"]["data"]["items"].map((item, index) => (
                                    <li key={index}>{ item }</li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <Hero level={6}>{ Common.lines[lang]["policy"]["usage"]["title"] }</Hero>
                    <div className="flex flex-col gap-2">
                        <p>{ Common.lines[lang]["policy"]["usage"]["body"] }</p>
                        <ul className="list-disc list-inside">
                            {
                                Common.lines[lang]["policy"]["usage"]["items"].map((item, index) => (
                                    <li key={index}>{ item }</li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <Hero level={6}>{ Common.lines[lang]["policy"]["sharing"]["title"] }</Hero>
                    <div className="flex flex-col gap-2">
                        <p>{ Common.lines[lang]["policy"]["sharing"]["body"] }</p>
                        <ul className="list-disc list-inside">
                            {
                                Common.lines[lang]["policy"]["sharing"]["items"].map((item, index) => (
                                    <li key={index}>{ item }</li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <Hero level={6}>{ Common.lines[lang]["policy"]["transfers"]["title"] }</Hero>
                    <div className="flex flex-col gap-2">
                        <p>{ Common.lines[lang]["policy"]["transfers"]["body"] }</p>
                        <ul className="list-disc list-inside">
                            {
                                Common.lines[lang]["policy"]["transfers"]["items"].map((item, index) => (
                                    <li key={index}>{ item }</li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </PolicyLayout>
        </Container>
    );
}