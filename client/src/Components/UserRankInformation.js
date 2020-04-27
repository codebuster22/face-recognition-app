import React from "react";

const Rank = ({name, nonce}) => (
    <div className={"tc-l ph3"}>
        <h1 className={"f2 f1-l fw2 white-90 mb0 lh-title"}>Hello {name}</h1>
        <h2 className={"fw1 f3 white-80 mt3 mb4"}>Your rank is {nonce}</h2>
      </div>
);

export default Rank;