import { useEffect, useState } from "react";
import { Container } from "../layout/Container";
import { HomeLayout } from "../layout/HomeLayout";
import { Hero } from "../Typography/Hero";
import axios from "axios";
import { Common } from "../../Context/Common";
import { HomeTitleLayout } from "../layout/HomeTitleLayout";
import { Button } from "../interaction/Button";
import { useNavigate } from "react-router";
import { HomeFeaturesLayout } from "../layout/HomeFeaturesLayout";
import { HomeFeature } from "../interaction/HomeFeature";
import { HomeCallToActionLayout } from "../layout/HomeCallToActionLayout";
import { OutlineBlackButton } from "../interaction/OutlineBlackButton";
import { HomeFeedbackItem } from "../interaction/HomeFeedbackItem";
import { PopActionLayout } from "../layout/PopActionLayout";
import { DangerButton } from "../interaction/DangerButton";
import { InputLayout } from "../layout/InputLayout";
import { PopUpBodyLayout } from "../layout/PopUpBodyLayout";
import { TextInput } from "../interaction/TextInput";
import { RadioInput } from "../interaction/RadioInput";

export function Home() {
  const [homeInfo, setHomeInfo] = useState([]);
  const [feedbackHidden, setFeedbackHidden] = useState(true);
  const [userFeedback, setUserFeedback] = useState("");
  const [feedbackError, setFeedbackError] = useState(false);
  const [grade, setGrade] = useState(1);

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
      setHomeInfo(res.data.feed_back);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  async function sendFeedback() {
    if (!userFeedback) {
      setFeedbackError(true);
    } else {
      axios.post(
        `${Common.url}/feedback/`,
        {body: userFeedback, grade: grade},
        {headers: {"Authorization": token}}
      )
      .then((res) => {
        setFeedbackHidden(true);
        setUserFeedback("");
        setGrade(1);
        document.querySelector("body").style.overflowY = "scroll";
      })
      .catch((err) => {
        console.log(err);
      });
    }
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
        <HomeFeaturesLayout>
          <div className="pb-1 border-b border-zinc-900">
            <Hero level={6}>{ Common.lines[lang]["home"]["feedback"]["title"] }</Hero>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {
              homeInfo.map(item => (<HomeFeedbackItem key={item["id"]} userId={item["user_id"]} username={item["user_name"]} grade={item["grade"]} text={item["body"]} />))
              
            }
          </div>
          <div className="flex items-center justify-between flex-wrap gap-2 mb-12" style={token ? {"visibility": "visible"} : {"visibility": "hidden"}}>
            <p className="text-[20px] font-medium">{ Common.lines[lang]["home"]["feedback"]["question"] }</p>
            <div className="w-full md:w-fit">
              <OutlineBlackButton type="button" handleClick={() => {
                window.scrollTo(0, 0);
                document.querySelector("body").style.overflow = "hidden";
                setFeedbackHidden(false);
              }}>{ Common.lines[lang]["button"]["feedbackBtn"] }</OutlineBlackButton>
            </div>
          </div>
        </HomeFeaturesLayout>
      </HomeLayout>
      <PopActionLayout hidden={feedbackHidden}>
        <PopUpBodyLayout>
          <InputLayout>
          <Hero level={6}>{ Common.lines[lang]["title"]["feedbackPopUp"] }</Hero>
          <TextInput
              id="userComment"
              value={userFeedback}
              placeholder={ Common.lines[lang]["placeholder"]["feedbackInput"] }
              handleChange={(e) => {
                  setUserFeedback(e.target.value)
                  setFeedbackError(false);
              }}
              isErr={feedbackError}
              errMsg={Common.lines[lang]["error"]["empty"]}
          />
          <div className="flex justify-center gap-6">
            <RadioInput handleClick={() => setGrade(1)} active={grade == 1}>1</RadioInput>
            <RadioInput handleClick={() => setGrade(2)} active={grade == 2}>2</RadioInput>
            <RadioInput handleClick={() => setGrade(3)} active={grade == 3}>3</RadioInput>
            <RadioInput handleClick={() => setGrade(4)} active={grade == 4}>4</RadioInput>
            <RadioInput handleClick={() => setGrade(5)} active={grade == 5}>5</RadioInput>
          </div>
          </InputLayout>
          <div className="flex gap-2">
              <DangerButton
                  type="button"
                  handleClick={() => {
                      setFeedbackError(false);
                      setFeedbackHidden(true);
                      setGrade(1);
                      setUserFeedback("");
                      document.querySelector("body").style.overflowY = "scroll";
                  }}
              >{ Common.lines[lang]["button"]["cancelBtn"] }</DangerButton>
              <Button
                  type="button"
                  handleClick={() => {
                      sendFeedback();
                  }}
              >{ Common.lines[lang]["button"]["sendBtn"] }</Button>
          </div>
        </PopUpBodyLayout>
      </PopActionLayout>
    </Container>
  );
}