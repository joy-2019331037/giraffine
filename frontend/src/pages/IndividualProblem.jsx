import React from "react";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "../components/Editor/theme.js";
import Editor from "../components/Editor/Editor.jsx";

import "./../styles/individualproblem.css";

const IndividualProblem = () => {
  return (
    <>
      <div className="indvidualproblem">
        <div>Problem Description
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate quibusdam eaque quae eveniet tempora veniam? Sint totam, odio recusandae in assumenda laboriosam aspernatur amet quos? Id veritatis eum esse hic.</p>
        </div>
        <ChakraProvider className="chakra" theme={theme}>
          <Editor />
        </ChakraProvider>
      </div>
    </>
  );
};

export default IndividualProblem;
