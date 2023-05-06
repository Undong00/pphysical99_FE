import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { isEdit } from "../redux/modules/componentMode";
import Answer from "../components/Answer";
import * as CSS from"../style/commonStyle";

function Test() {

  return (
    <CSS.Main>
        TEST
        <Answer isEdit="true"></Answer>
    </CSS.Main>
    );
}


export default Test;
