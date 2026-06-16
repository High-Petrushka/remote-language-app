import { useEffect, useRef, useState } from "react";
import { Container } from "../layout/Container";
import { HomeLayout } from "../layout/HomeLayout";
import { HomeLessonsLayout } from "../layout/HomeLessonsLayout";
import { Hero } from "../Typography/Hero";
import { HomeHero } from "../Typography/HomeHero";
import axios from "axios";
import { Common } from "../../Context/Common";
import { HomeLesson } from "../interaction/HomeLesson";
import { HomeTitleLayout } from "../layout/HomeTitleLayout";
import { Button } from "../interaction/Button";
import { useNavigate } from "react-router";
import { HomeFeaturesLayout } from "../layout/HomeFeaturesLayout";
import { HomeFeature } from "../interaction/HomeFeature";
import { HomeCallToActionLayout } from "../layout/HomeCallToActionLayout";
import { OutlineBlackButton } from "../interaction/OutlineBlackButton";

export function Home() {
  const [homeInfo, setHomeInfo] = useState({});
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  let navigate = useNavigate();
  let lang = localStorage.getItem("language");

  if (!lang) {
    lang = "en";
  }

  async function getHomeInfo() {
    axios.get(`${Common.url}/`)
    .then((res) => {
      setHomeInfo(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    getHomeInfo();
    
    function handleScroll() {
      let sun = document.getElementById("homeSun");
      if (sun) {
        sun.style.transform = `rotate(-${window.scrollY/10}deg)`;
      }
    }

    window.addEventListener("scroll", handleScroll, true);

  }, []);

  return (
    <Container>
      <HomeLayout>
        <HomeHero>STUDY & FUN</HomeHero>
        <HomeTitleLayout>
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-[clamp(28px,5vw,56px)] leading-[1.2]">{ Common.lines[lang]["home"]["title"] }</h2>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-lg text-zinc-900/80">{ Common.lines[lang]["home"]["titleText"] }</p>
              <div className="self-start">
                {
                  !token ?
                    <Button type="button" handleClick={() => navigate("/login")}>{ Common.lines[lang]["button"]["signIn"] }</Button>
                  :
                    <Button type="button" handleClick={() => navigate(`/profile/${userId}`)}>{ Common.lines[lang]["menu"]["profile"] }</Button>
                }
              </div>
            </div>
          </div>
          <div></div>
          <img
            id="homeSun"
            src="/src/assets/icons/sun.svg"
            alt="Sun image"
            className="absolute w-[clamp(150px,32vw,450px)] bottom-[-25%] md:hidden xl:block xl:bottom-[-50%] right-0"
          />
        </HomeTitleLayout>
        <HomeFeaturesLayout>
          <div className="pb-1 border-b border-zinc-900">
            <Hero level={6}>{ Common.lines[lang]["title"]["mainFeatures"] }</Hero>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <HomeFeature
              title={Common.lines[lang]["home"]["features"]["lessons"]["title"]}
              text={Common.lines[lang]["home"]["features"]["lessons"]["text"]}
              imgSrc="/src/assets/features/lesson.svg"
              btnText={ Common.lines[lang]["button"]["seeLessons"] }
              handleBtn={() => navigate("/lessons")}
            />
            <HomeFeature
              title={Common.lines[lang]["home"]["features"]["tests"]["title"]}
              text={Common.lines[lang]["home"]["features"]["tests"]["text"]}
              imgSrc="/src/assets/features/test.svg"
              btnText={Common.lines[lang]["button"]["findTests"]}
              handleBtn={() => navigate("/lessons")}
            />
            <HomeFeature
              title={Common.lines[lang]["home"]["features"]["creation"]["title"]}
              text={Common.lines[lang]["home"]["features"]["creation"]["text"]}
              imgSrc="/src/assets/features/creation.svg"
              btnText={ Common.lines[lang]["button"]["createLesson"] }
              handleBtn={() => navigate("/creation")}
            />
          </div>
        </HomeFeaturesLayout>
        <HomeCallToActionLayout>
          <img src="/src/assets/icons/globe.svg" alt="Globe icon" className="w-16" />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1 text-center">
              <Hero level={4}>{ Common.lines[lang]["home"]["callToAction"]["title"] }</Hero>
              <p className="text-lg text-zinc-900/80">{ Common.lines[lang]["home"]["callToAction"]["text"] }</p>
            </div>
            <div className="flex justify-center gap-2">
              {
                !token ?
                  <Button type="button" handleClick={() => navigate("/login")}>{ Common.lines[lang]["button"]["signIn"] }</Button>
                :
                  null
              }
              {
                !token ?
                  <OutlineBlackButton type="button" handleClick={() => navigate("/registration")}>{ Common.lines[lang]["button"]["signUp"] }</OutlineBlackButton>
                :
                  null
              }
            </div>
          </div>
        </HomeCallToActionLayout>
      </HomeLayout>
    </Container>
  );
}