import { useNavigate } from "react-router";

export function Logo() {
    const navigate = useNavigate();

    return (
        <i><p onClick={() => navigate("/")} className="text-2xl font-extrabold cursor-pointer">RLang</p></i>
    );
}