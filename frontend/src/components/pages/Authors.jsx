import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import { Container } from "../layout/Container";
import { DisplayHero } from "../Typography/DisplayHero";
import { ListLayout } from "../layout/ListLayout";
import { UserListItem } from "../interaction/UserListItem";
import { Pagination } from "../interaction/Pagination";
import { Common } from "../../Context/Common";

export function Authors() {
    const [users, setUsers] = useState([]);
    const [nextLink, setNextLink] = useState(null);
    const [prevLink, setPrevLink] = useState(null);
    const [curPage, setCurPage] = useState(1);
    const [blocked, setBlocked] = useState(false);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    let lang = localStorage.getItem("language");

    if (!lang) {
        lang = "en";
    }

    async function getUsers(url) {
        try {
            let response = await fetch(url);

            if (response.status === 404) {
                navigate("*");
            }

            let result = await response.json();
            return result;
        } catch(err) {
            console.log(err);
        }
    }


    async function blockUser(userId, activeState) {
        axios.put(
            `${Common.url}/administration/users/${userId}/block/`,
            {is_active: !activeState},
            {headers: {"Authorization": token}}
        )
        .then(() => {
            setBlocked(!blocked);
        })
        .catch((err) => {
            console.log(err);
            console.log(token)
        });
    }

    const handleNextPage = () => {
        if (nextLink) {
            const result = getUsers(nextLink);
            result.then(response => {
                setUsers([...response["results"]]);
                setNextLink(response["links"]["next"]);
                setPrevLink(response["links"]["previous"]);
                setCurPage(response["page"]);
            });
        }
    };

    const handlePrevPage = () => {
        if (prevLink) {
            const result = getUsers(prevLink);
            result.then(response => {
                setUsers([...response["results"]]);
                setNextLink(response["links"]["next"]);
                setPrevLink(response["links"]["previous"]);
                setCurPage(response["page"]);
            })
        }
    };

    useEffect(() => {

        const result = getUsers(`${Common.url}/users/`)

        result.then(response => {
            setUsers([...response["results"]]);
            setNextLink(response["links"]["next"]);
            setPrevLink(response["links"]["previous"]);
        });

    }, [blocked]);

    return (
        <Container>
            <DisplayHero>{ Common.lines[lang]["title"]["authors"] }</DisplayHero>
            <ListLayout>
                {
                    users.map(user => (
                        <UserListItem
                            key={user.id}
                            imgSrc={user.avatar}
                            username={user.username}
                            email={user.email}
                            isActive={user.is_active}
                            link={`/profile/${user.id}`}
                            handleBlock={() => blockUser(user.id, user.is_active)}
                        />
                    ))
                }
            </ListLayout>
            <Pagination curPage={curPage} handlePrev={handlePrevPage} handleNext={handleNextPage} />
        </Container>
    );
}