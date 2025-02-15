import { useContext } from "react";
import TitleHeader from "../icons/TitleHeader";
import UserIcon from "../icons/UserIcon";
import { postContext } from "../../App";
import { useNavigate } from "react-router-dom";
/*eslint no-unused-vars:0*/
const MainMenu = () => {
    const { user } = useContext(postContext);
    const nav = useNavigate();

    const visitProfile = () => {
        nav("/profile/" + user.id);
    };
    return (
        <>
        <header className="header">
            <div className="main-menu">
                <TitleHeader />
                <UserIcon
                    firstName={user.firstName}
                    lastName={user.lastName}
                    color ={user.favouriteColour}
                    onClick={visitProfile}
                />
            </div>
        </header>
        </>
    );
};
export default MainMenu;