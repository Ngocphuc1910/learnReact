const h1 = <h1>Trying to learn React</h1>;
const myArticle = <article>This is my article content.</article>;


import React from 'react';
import { createRoot } from 'react-dom/client'

const container = document.getElementById('app');
const root = createRoot(container);
// Write code here:
const myDiv = (
  <div className ="big">I AM A BIG DIV</div>
)