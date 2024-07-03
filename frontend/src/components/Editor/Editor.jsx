import { Box } from "@chakra-ui/react";
import CodeEditor from './CodeEditor.jsx';

const Editor = () => {
  return <> 
  <Box
  minH="50vh" bg='#0f0a19' color='blue.600' px={6} py={8} ml={200} mr={200} mt={50}
  >
  <CodeEditor/>
  </Box>
  </>;
}

export default Editor;