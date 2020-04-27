import React from "react";
import './CSS/UrlbarStylesheet.css';

const UrlBar = ({onInputChange, onSubmit}) => (
  <div className={"urlBar pa4 br3 shadow-5"} style={{width: "100%"}}>
  <input type={"text"} className={"w-70 pa2 f4"} placeholder={"URL"} aria-label={"Recipient's username"} aria-describedby={"button-addon2"} onChange={onInputChange}/>
  <button className={"w-30 grow f4 link ph3 pv2 dib black"} type={"button"} id={"button-addon2"} onClick={onSubmit}>Find</button>
</div>
);

export default UrlBar;