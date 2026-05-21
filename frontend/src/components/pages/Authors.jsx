import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { Container } from "../layout/Container";
import { DisplayHero } from "../Typography/DisplayHero";
import { ListLayout } from "../layout/ListLayout";
import { UserListItem } from "../interaction/UserListItem";
import { Pagination } from "../interaction/Pagination";

export function Authors() {
    const [users, setUsers] = useState([]);
    const [nextLink, setNextLink] = useState(null);
    const [prevLink, setPrevLink] = useState(null);
    const [curPage, setCurPage] = useState(1);

    const navigate = useNavigate();

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

        const result = getUsers(`http://localhost:8000/users/`)

        result.then(response => {
            setUsers([...response["results"]]);
            setNextLink(response["links"]["next"]);
            setPrevLink(response["links"]["previous"]);
        });

    }, []);

    return (
        <Container>
            <DisplayHero>AUTHORS</DisplayHero>
            <ListLayout>
                {
                    users.map(user => (
                        <UserListItem key={user.id} imgSrc={user.avatar} username={user.username} email={user.email} link={`/profile/${user.id}`} />
                    ))
                }
            </ListLayout>
            <Pagination curPage={curPage} handlePrev={handlePrevPage} handleNext={handleNextPage} />
        </Container>
    );
}