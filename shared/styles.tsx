import { css, Global } from '@emotion/react';

export const media = {
  maxMobile: '@media(max-width:900px)',
  minlaptop: '@media(min-width:800px)',
  large: '@media(min-width:1200px)',
};

export const globalStyles = (
  <Global
    styles={css`
      html,
      body {
        box-sizing: border-box;

        padding: 0;
        margin: 0;

        overflow-x: hidden;

        font-family: 'JetBrains Mono', sans-serif;

        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;

        a {
          text-decoration: none;
        }
      }

      body::-webkit-scrollbar {
        width: 4px;
      }
      body::-webkit-scrollbar-track {
        background: #03263a;
      }
      body::-webkit-scrollbar-thumb {
        background-color: #4fbfa5;
        border-radius: 20px;
      }

      :root {
        --white: #f7f7f7;
        --black: #222222;
        --dark: #060606;

        --gray: rgba(255, 255, 255, 0.3);
      }

      @keyframes loading {
        to {
          transform: rotate(1turn);
        }
      }
    `}
  />
);
