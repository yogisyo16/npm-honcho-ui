import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { HonchoEditorSingleCleanDemo } from '@yogiswara/honcho-editor-ui/hooks/demo';
import { EditorProvider } from "@yogiswara/honcho-editor-ui/lib/context/EditorContext";

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <EditorProvider 
        scriptUrl="/honcho-photo-editor.js"
        wasmUrl="/honcho-photo-editor.wasm"
      >
        <HonchoEditorSingleCleanDemo />
      </EditorProvider>
    </ThemeProvider>
  );
}

export default App;