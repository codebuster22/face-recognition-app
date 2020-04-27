import React from "react";
import Photo from "../Components/ProfilePhoto";
import ButtonC from "../Components/Button";

const NavBar = ({onChangeRoute, isSignedIn}) => {
    return (
        <nav className={"navbar navbar-light bg-light"}>
            <Photo/>
            {isSignedIn?(<ButtonC action={"signin"} name={"Sign Out"} className={"signOut"} onChangeRoute={onChangeRoute}/>):
                <div>
                    <ButtonC action={"signin"} name={"Sign In"} className={"signOut pointer"} onChangeRoute={onChangeRoute}/>
                    <ButtonC action={"register"} name={"Register"} className={"signOut pointer"} onChangeRoute={onChangeRoute}/>
                </div>
            }
        </nav>
    );
}

export default NavBar;