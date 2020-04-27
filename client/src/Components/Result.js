import React from "react";
import './CSS/resultStylesheet.css';


const styles = {
    width: '50%',
    height: 'auto',
};

const Result = ({url, facePosition}) => {
    if(url!==''){
        return (
            <div className={"absolute mt2 size result center"} styles={styles}>
                <img id={"imageToDetectFace"} className={"w-100"} alt={"Find face"} src={url}/>
                {facePosition.map((coordinate,i)=>
                    ( <div key={i} className={"faceBox"} style={{top: coordinate.top, right: coordinate.right, bottom: coordinate.bottom, left: coordinate.left}}></div>)
                )}
        </div>)
    } else {
        return (<h1>Enter URL</h1>)
    }
};

export default Result;