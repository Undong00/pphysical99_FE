import React from "react";

function Btn(props) {
return (
    <>
        {
            props.type === 'primary' ? <button onClick={props.onClick}>{props.children}</button> : <button onClick={props.onClick}>{props.children}</button>
        }
    </>
);
}

export default Btn;
