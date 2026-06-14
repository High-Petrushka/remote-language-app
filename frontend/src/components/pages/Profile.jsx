import axios from "axios";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { Container } from "../layout/Container";
import { Hero } from "../Typography/Hero";
import { ProfileLayout } from "../layout/ProfileLayout";
import { ProfileInfoLayout } from "../layout/ProfileInfoLayout";
import { ProfileLessonLayout } from "../layout/ProfileLessonsLayout";
import { ProfileUserInfo } from "../Typography/ProfileUserInfo";
import { ProfileLesson } from "../interaction/ProfileLesson";
import { ProfileInput } from "../interaction/ProfileInput";
import { Button } from "../interaction/Button";

import { Common } from "../../Context/Common";
import { Avatar } from "../interaction/Avatar";
import { ProfileBioInput } from "../interaction/ProfileBioInput";
import { PopMessage } from "../interaction/PopMessage";
import { PopActionLayout } from "../layout/PopActionLayout";
import { DangerButton } from "../interaction/DangerButton";
import { PopUpBodyLayout } from "../layout/PopUpBodyLayout";
import { InputLayout } from "../layout/InputLayout";

export function Profile() {
    const navigate = useNavigate();
    const curUser = Number(localStorage.getItem("userId"));
    const token = localStorage.getItem("token");
    const [lang, setLang] = useState(localStorage.getItem("language"));
    const params = useParams();

    const [userInfo, setUserInfo] = useState({});
    const [lessons, setLessons] = useState([]);

    const [newName, setNewName] = useState("")
    const [newSurname, setNewSurname] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newAvatar, setNewAvatar] = useState("");
    const [newBio, setNewBio] = useState("");

    const[msgHidden, setMsgHidden] = useState(true);
    const [message, setMessage] = useState("");

    const [deleteHidden, setDeleteHidden] = useState(true);
    const [lessonToDelete, setLessonToDelete] = useState(null);
    const [deleted, setDeleted] = useState(false);

    let nameComp;
    let surnameComp;
    let emailComp;
    let avatarComp;
    let avatarInputComp;
    let bioComp;

    if (!lang) {
        setLang("en");
    }

    async function postProfileChanges(url) {
        let formData = new FormData();
        newAvatar ? formData.append("avatar", document.getElementById("avatar").files[0]) : null;
        formData.append("first_name", newName);
        formData.append("last_name", newSurname);
        formData.append("email", newEmail);
        formData.append("bio", newBio);

        axios.put(url, formData, {headers: {"Authorization": token}})
            .then(() => {
                setMessage("Saved successfully!");
                setMsgHidden(false);
                setTimeout(() => {
                    setMsgHidden(true);
                }, 5000);
            })
            .catch(() => {
                setMessage(Common.networkErrorMsg);
                setMsgHidden(false);
                setTimeout(() => {
                    setMsgHidden(true);
                }, 5000);
            });
    }
    

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


    async function deleteLesson(lessonId) {
        axios.delete(
            `${Common.url}/lessons/${lessonId}/`,
            {headers: {"Authorization": token}}
        ).then(() => {
            setDeleted(!deleted);
        });
    }


    useEffect(() => {
        if (params.userId == "1" && curUser !== 1) {
            navigate("/")
        }
        const user = getUser(`http://localhost:8000/users/${Number(params.userId)}/`);
        user.then(response => {
            setUserInfo({...response});
            setLessons([...response["lesson_set"]]);
            setNewName(response["first_name"]);
            setNewSurname(!response["last_name"] ? "" : response["last_name"]);
            setNewBio(!response["bio"] ? "" : response["bio"]);
            setNewEmail(response["email"]);
        });
    }, [params.userId, deleted]);

    if (newAvatar) {
        avatarComp = <Avatar imgSrc={URL.createObjectURL(document.getElementById("avatar").files[0])} imgAlt="New user avatar" width="[clamp(250px,40vw,350px)]" />
    } else {
        avatarComp = userInfo["avatar"] ? <img src={userInfo["avatar"]} className="w-[clamp(250px,40vw,350px)] h-auto aspect-square rounded-full mx-auto" /> : <img src="/src/assets/icons/user.svg" className="w-[clamp(250px,40vw,350px)] rounded-full mx-auto" />
    }

    if (Number(params["userId"]) === curUser) {
        nameComp = <ProfileInput
                title={`${Common.lines[lang]["title"]["name"]}`}
                id="name"
                placeholder="Your name..."
                value={newName}
                handleChange={(e) => setNewName(e.target.value)}
                incorrect={false}
                errorText="None"
            />;
        surnameComp = <ProfileInput
                title={`${Common.lines[lang]["title"]["surname"]}`}
                id="surname"
                placeholder="Your surname..."
                value={newSurname}
                handleChange={(e) => setNewSurname(e.target.value)}
                incorrect={false}
                errorText="None"
            />
        emailComp = <ProfileInput
                title="Email"
                id="email"
                placeholder="you@example.com"
                value={newEmail}
                handleChange={(e) => setNewEmail(e.target.value)}
                incorrect={false}
                errorText="None"
            />
        bioComp = <ProfileBioInput
                id="bio"
                value={newBio}
                placeholder="Your bio..."
                handleChange={(e) => setNewBio(e.target.value)}
             />
        avatarInputComp = (<div className="pt-6 flex items-center justify-between">
                    <input
                        type="file"
                        id="avatar"
                        value={newAvatar}
                        accept="image/*"
                        className="w-50 cursor-pointer active:outline active:outline-zinc-900"
                        onChange={(e) => setNewAvatar(e.target.value)}
                    />
                    <img src="/src/assets/icons/save.svg" alt="File icon" />
                </div>)
    } else {
        nameComp = userInfo["first_name"] ? <ProfileUserInfo title={`${Common.lines[lang]["title"]["name"]}`} text={userInfo["first_name"]} /> : <ProfileUserInfo title={`${Common.lines[lang]["title"]["name"]}`} text="-" />;
        surnameComp = userInfo["last_name"] ? <ProfileUserInfo title={`${Common.lines[lang]["title"]["surname"]}`} text={userInfo["last_name"]} /> : <ProfileUserInfo title={`${Common.lines[lang]["title"]["surname"]}`} text="-" />;
        emailComp = <ProfileUserInfo title="Email" text={userInfo["email"]} link={`mailto:${userInfo["email"]}`} />;
        bioComp = userInfo["bio"] ? <p className="text-[16px] lg:text-lg">{ userInfo["bio"] }</p> : <p className="text-[16px] lg:text-lg">No bio is set.</p>;
        avatarInputComp = null;

    }

    return (
        <Container>
            <ProfileLayout>
                <ProfileInfoLayout>
                    <div>
                        <div className="w-full h-fit pb-6 border-b border-zinc-900">
                        { avatarComp }
                        { avatarInputComp }
                        </div>
                        <div className="pt-6">
                            { nameComp }
                            { surnameComp }
                            { emailComp }
                        </div>
                        <div className="mt-6" style={Number(params["userId"]) == curUser ? {"display": "block"} : {"display": "none"}}>
                            <Button type="button" handleClick={() => postProfileChanges(`${Common.url}/users/${curUser}/`)}>
                                { Common.lines[`${lang}`]["button"]["saveBtn"] }
                            </Button>
                        </div>
                    </div>
                    <div className="grow flex flex-col gap-3">
                        <Hero level={2}>{ userInfo["username"] }</Hero>
                        { bioComp }
                    </div>
                </ProfileInfoLayout>
                <ProfileLessonLayout lessons={lessons.length}>
                    <Hero level={2}>Lessons by {userInfo.username}</Hero>
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {
                            lessons.length === 0 ?
                                <p>The user has no lessons, yet.</p>
                            :
                                lessons.map(lesson => (
                                    <ProfileLesson
                                        key={lesson["id"]}
                                        id={lesson["id"]}
                                        title={lesson["title"]}
                                        imgSrc={lesson["poster"]}
                                        type={lesson["type"]}
                                        language={lesson["language"]}
                                        lessonDate={lesson["created"]}
                                        ownerId={lesson["owner_id"]}
                                        handleDelete={() => {
                                            setDeleteHidden(false);
                                            window.scrollTo(0, 0);
                                            document.querySelector("body").style.overflow = "hidden";
                                            setLessonToDelete(lesson["id"]);
                                        }}
                                    />
                                ))
                        }
                    </div>
                </ProfileLessonLayout>
            </ProfileLayout>
            <PopActionLayout hidden={deleteHidden} >
                <PopUpBodyLayout>
                    <InputLayout>
                    <Hero level={6}>Deletion</Hero>
                    <p className="text-[16px] lg:text-lg">{ Common.lines.en.question.lessonDelete }</p>
                    </InputLayout>
                    <div className="flex gap-2">
                        <Button
                            type="button"
                            handleClick={() => {
                                setDeleteHidden(true);
                                document.querySelector("body").style.overflowY = "scroll";
                            }}
                        >Cancel</Button>
                        <DangerButton
                            type="button"
                            handleClick={() => {
                                deleteLesson(lessonToDelete);
                                setDeleteHidden(true);
                                document.querySelector("body").style.overflowY = "scroll";
                            }}
                        >Delete</DangerButton>
                    </div>
                </PopUpBodyLayout>
            </PopActionLayout>
            <PopMessage msgText={message} hidden={msgHidden} />
        </Container>
    );
}