import { useContext } from "react";
import { NavContext } from "../../Context/NavContext";

export function NavPanelLayout({ children }) {
    const {hidden} = useContext(NavContext);

    return (
        <div
            className="h-full flex flex-col justify-between transition-opacity duration-300"
            style={hidden ? {"opacity": "0", "transitionDelay": "0ms"} : {"opacity": "1", "transitionDelay": "300ms"}}
        >
            { children }
        </div>
    );
}