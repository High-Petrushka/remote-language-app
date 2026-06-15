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

export function Home() {
  const [homeInfo, setHomeInfo] = useState({});
  const token = localStorage.getItem("token");
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
      let scrollEl = document.getElementById("root");
      sun.style.transform = `rotate(-${scrollEl.scrollTop/10}deg)`
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
              <p className="text-lg text-zinc-900/70">{ Common.lines[lang]["home"]["titleText"] }</p>
              <div className="self-start">
                {
                  !token ?
                    <Button type="button" handleClick={() => navigate("/login")}>{ Common.lines[lang]["button"]["signIn"] }</Button>
                  :
                    <Button type="button" handleClick={() => navigate("/creation")}>{ Common.lines[lang]["button"]["createLesson"] }</Button>
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
      </HomeLayout>
      <div className="h-full"></div>
    </Container>
  );
}