import { Box, HStack, VStack, Text, Textarea } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector.jsx";
import { CODE_SNIPPETS } from "./constants.js";
import Output from "./Output.jsx";

const CodeEditor = ({
  editorRef,
  value,
  setValue,
  language,
  setLanguage,
  input,
  setInput,
  onMount,
  onSelect,
  runCode,
  output,
  isLoading,
  isError,
}) => {
  return (
    <Box
      minH="50vh"
      bg="rgb(242, 249, 255)"
      color="chocolate"
      px={6}
      py={8}
      ml={200}
      mr={200}
      mt={50}
    >
      <Box>
        <HStack spacing={4}>
          <Box w="50%">
            <LanguageSelector language={language} onSelect={onSelect} />
            <Editor
              height="70vh"
              theme="vs"
              language={language}
              defaultValue={CODE_SNIPPETS[language]}
              value={value}
              onMount={onMount}
              onChange={(value) => setValue(value)}
            />
          </Box>
          <Box w="50%">
            <Text mt={10} mb={2} fontSize="lg">
              Input
            </Text>
            <Textarea
              placeholder="Enter input here..."
              border="2px solid"
              borderColor="blue.600"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              height="20vh"
              mb={4}
            />
            <Output
              editorRef={editorRef}
              language={language}
              input={input}
              runCode={runCode}
              output={output}
              isLoading={isLoading}
              isError={isError}
            />
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};

export default CodeEditor;

// import { Box, HStack } from "@chakra-ui/react";
// import React, { useRef } from "react";
// import { Editor } from "@monaco-editor/react";
// import { useState } from "react";
// import LanguageSelector from "./LanguageSelector.jsx";
// import { CODE_SNIPPETS } from "./constants.js";
// import Output from "./Output.jsx";

// const CodeEditor = () => {
//   const editorRef = useRef(null);
//   const [value, setValue] = useState("");
//   const [language, setLanguage] = useState("javascript");

//   const onMount = (editor) => {
//     editorRef.current = editor;
//     editor.focus();
//   };

//   const onSelect = (lang) => {
//     setLanguage(lang);
//     setValue(CODE_SNIPPETS[lang]);
//   };

//   return (
//     <Box>
//       <HStack spacing={4}>
//         <Box w="50%">
//           <LanguageSelector language={language} onSelect={onSelect} />
//           <Editor
//             height="70vh"
//             theme="vs-dark"
//             language={language}
//             defaultValue={CODE_SNIPPETS[language]}
//             value={value}
//             onMount={onMount}
//             onChange={(value) => setValue(value)}
//           />

//         </Box>
//         <Output editorRef={editorRef} language={language}/>
//       </HStack>
//     </Box>
//   );
// };

// export default CodeEditor;
