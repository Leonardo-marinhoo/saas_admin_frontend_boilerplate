import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
  }

  body {
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    font-family: ${(props) => props.theme.typography.fontFamily};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button, input, textarea {
    font-family: ${(props) => props.theme.typography.fontFamily};
  }

  input, textarea, select {
    font-size: ${(props) => props.theme.typography.fontSize.md};
  }

  a {
    color: ${(props) => props.theme.colors.primary};
    text-decoration: none;
    transition: color ${(props) => props.theme.transitions.default};

    &:hover {
      color: ${(props) => props.theme.colors.primaryDark};
    }
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.background};
    border-radius: ${(props) => props.theme.borderRadius.sm};
  }

  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.border};
    border-radius: ${(props) => props.theme.borderRadius.sm};
    
    &:hover {
      background: ${(props) => props.theme.colors.textLight};
    }
  }

  /* Remove outline for non-keyboard focus */
  :focus:not(:focus-visible) {
    outline: none;
  }

  /* Show outline for keyboard focus */
  :focus-visible {
    outline: 2px solid ${(props) => props.theme.colors.primary};
    outline-offset: 2px;
  }
`;
