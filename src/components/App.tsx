/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';

const app = css`
  text-align: center;
`;

const appHeader = css`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const appLink = css`
  color: #09d3ac;
`;

const App: React.FC = () => {
  return (
    <div css={app}>
      <header css={appHeader}>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a css={appLink} href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
