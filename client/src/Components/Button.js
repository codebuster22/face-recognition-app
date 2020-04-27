import React from "react";
import './CSS/ButtonStylesheet.css'

const ButtonC = ({action, onChangeRoute, name}) => (
    <div className={"button"}>
        <p onClick={()=>onChangeRoute(action)} className="f6 grow no-underline br-pill ba bw2 ph3 pv2 dib mid-gray pointer" href="#0">{name}</p>
    </div>
);

export default ButtonC;