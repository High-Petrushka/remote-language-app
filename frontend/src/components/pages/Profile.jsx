import { useEffect, useState } from "react";
import { Container } from "../layout/Container";
import { useNavigate, useParams } from "react-router";
import { Hero } from "../Typography/Hero";
import { ProfileLayout } from "../layout/ProfileLayout";
import { ProfileInfoLayout } from "../layout/ProfileInfoLayout";
import { ProfileLessonLayout } from "../layout/ProfileLessonsLayout";
import { ProfileUserInfo } from "../Typography/ProfileUserInfo";
import { ProfileLesson } from "../interaction/ProfileLesson";

export function Profile() {
    const navigate = useNavigate();
    const curUser = Number(localStorage.getItem("userId"));
    const params = useParams();

    const [userInfo, setUserInfo] = useState({});
    const [lessons, setLessons] = useState([]);

    

    async function getUser(url) {
        try {
            let response = await fetch(url, {
                headers: {
                    "Authorization": localStorage.getItem("token"),
                }
            });
            
            let result = await response.json();
            return result;
        } catch(err) {
            console.log(err);
        }
    }


    useEffect(() => {
        if (params.userId == "1" && curUser !== 1) {
            navigate("/")
        }
        const user = getUser(`http://localhost:8000/users/${Number(params.userId)}/`);
        user.then(response => {
            setUserInfo({...response});
            setLessons([...response["lesson_set"]]);
        });
    }, []);

    return (
        <Container>
            <ProfileLayout>
                <ProfileInfoLayout>
                    <div>
                        <div className="w-full h-fit pb-6 border-b border-zinc-900">
                        {
                            userInfo["avatar"] ?
                                <img src={userInfo["avatar"]} className="w-[clamp(250px,40vw,350px)] h-auto aspect-square rounded-full mx-auto" />
                            :
                                <img src="/src/assets/icons/user.svg" className="w-[clamp(250px,40vw,350px)] rounded-full mx-auto" />
                        }
                        </div>
                        <div className="pt-6">
                            {userInfo["first_name"] ? <ProfileUserInfo title="Name" text={userInfo["first_name"]} /> : <ProfileUserInfo title="Name" text="-" /> }
                            {userInfo["last_name"] ? <ProfileUserInfo title="Surname" text={userInfo["last_name"]} /> : <ProfileUserInfo title="Surname" text="-" /> }
                            <ProfileUserInfo title="Email" text={userInfo["email"]} link={`mailto:${userInfo["email"]}`} />
                        </div>
                    </div>
                    <div className="grow">
                        <Hero level={2}>{ userInfo["username"] }</Hero>
                        {userInfo["bio"] ? <p className="text-[16px] lg:text-lg">{ userInfo["bio"] }</p> : <p className="text-[16px] lg:text-lg">No bio is set.</p>}
                    </div>
                </ProfileInfoLayout>
                <ProfileLessonLayout>
                    <Hero level={2}>Lessons by {userInfo.username}</Hero>
                    {userInfo.id === curUser ? <span>my profile</span> : <span></span>}
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {
                            lessons.length === 0 ?
                                <p>The user has no lessons, yet.</p>
                            :
                                lessons.map(lesson => (
                                    <ProfileLesson
                                        key={lesson["id"]}
                                        title={lesson["title"]}
                                        imgSrc={lesson["poster"]}
                                        type={lesson["type"]}
                                        language={lesson["language"]}
                                        lessonDate={lesson["created"]}
                                    />
                                ))
                        }
                    </div>
                </ProfileLessonLayout>
            </ProfileLayout>
        </Container>
    );
}