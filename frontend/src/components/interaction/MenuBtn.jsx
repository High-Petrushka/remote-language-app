import { useContext } from "react";
import { NavContext } from "../../Context/NavContext";

export function MenuBtn() {

    const {hidden,setHidden} = useContext(NavContext);

    const handleClick = () => setHidden(!hidden);

    return (
        <button onClick={handleClick} className="cursor-pointer">
            <img src="/assets/menu.svg" />
        </button>
    );
}