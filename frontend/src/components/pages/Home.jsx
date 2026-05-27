import { useEffect, useState } from "react";
import { Container } from "../layout/Container";
import { HomeLayout } from "../layout/HomeLayout";
import { HomeLessonsLayout } from "../layout/HomeLessonsLayout";
import { Hero } from "../Typography/Hero";
import { HomeHero } from "../Typography/HomeHero";
import axios from "axios";
import { Common } from "../../Context/Common";
import { HomeLesson } from "../interaction/HomeLesson";

export function Home() {
  const [homeInfo, setHomeInfo] = useState({});

  async function getHomeInfo() {
    axios.get(`${Common.url}/`)
    .then((res) => {
      console.log(res.data);
      setHomeInfo(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    getHomeInfo();
  }, [])

  return (
    <Container>
      <HomeLayout>
        <HomeHero>STUDY & FUN</HomeHero>
        <HomeLessonsLayout>
          <Hero level={2}>Resent Lessons</Hero>
          <div className="flex flex-col gap-12">
            {
              homeInfo["resent_lessons"] ?
                homeInfo["resent_lessons"].map((lesson) => (
                  <HomeLesson 
                    id={lesson["id"]}
                    title={lesson["title"]}
                    description={lesson["description"]}
                    type={lesson["type"]}
                    language={lesson["language"]}
                    poster={lesson["poster"]}
                    author={lesson["owner"]}
                    author_id={lesson["owner_id"]}
                    created={lesson["created"]}
                  />
                ))
              :
                null
            }
          </div>
        </HomeLessonsLayout>
      </HomeLayout>
    </Container>
  );
}