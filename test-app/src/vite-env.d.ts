/// <reference types="vite/client" />

// Global window extensions
declare global {
  interface Window {
    HonchoEditor: any; // The HonchoEditor constructor loaded from the script
  }
}