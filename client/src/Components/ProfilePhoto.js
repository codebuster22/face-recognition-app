import React from "react";
import './CSS/ProfileStyleSheet.css';

const Photo = () => (
    <div className={"profile"}>
        <img src={"http://tachyons.io/img/logo.jpg"} className={"br-100 pa1 ba b--black-10 h3 w3"} alt={"avatar"}/>
    </div>
);

export default Photo;