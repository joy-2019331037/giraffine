import { Box, HStack } from "@chakra-ui/react";
import React, { useRef } from "react";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import LanguageSelector from "./LanguageSelector.jsx";
import { CODE_SNIPPETS } from "./constants.js";
import Output from "./Output.jsx";

const CodeEditor = () => {
  const editorRef = useRef(null);
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (lang) => {
    setLanguage(lang);
    setValue(CODE_SNIPPETS[lang]);
  };

  return (
    <Box>
      <HStack spacing={4}>
        <Box w="50%">
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            height="70vh"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            value={value}
            onMount={onMount}
            onChange={(value) => setValue(value)}
          />
          
        </Box>
        <Output editorRef={editorRef} language={language}/>
      </HStack>
    </Box>
  );
};

export default CodeEditor;
