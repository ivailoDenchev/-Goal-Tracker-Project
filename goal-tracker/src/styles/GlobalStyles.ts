import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #5664d2;
    --secondary-color: #4b56b8;
    --background-color: #f5f8ff;
    --header-bg: #5664d2;
    --content-bg: #4a86e8;
    --sidebar-bg: #ffffff;
    --text-color: #333333;
    --light-text: #666666;
    --white-text: #ffffff;
    --card-bg: #ffffff;
    --progress-bg: #f1f1ff;
    --success-color: #4CAF50;
    --warning-color: #FFC107;
    --danger-color: #F44336;
    --border-radius: 8px;
    --shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.6;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
  }

  ul, ol {
    list-style: none;
  }
`;

export default GlobalStyles; 