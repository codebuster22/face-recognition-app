import React from "react";
import Rank from "../Components/UserRankInformation";
import './CSS/CoverPageStylesheet.css'
import UrlBar from "../Components/ImageUrl";
import Tilt from 'react-tilt'

const CoverPage = ({onInputChange, onSubmit , name, nonce}) => (
    <div className={"coverPage center "}>
        <Rank name={name} nonce={nonce}/>
            <Tilt className="Tilt ba dark-gray bg-white b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5" options={{ max : 15 }} >
                <div className="Tilt-inner ">
                    <UrlBar onInputChange={onInputChange} onSubmit={onSubmit}/>
                </div>
            </Tilt>
    </div>
);

export default CoverPage;