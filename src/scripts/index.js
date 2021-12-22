import 'regenerator-runtime';
import '../styles/custom.css';
import '../styles/style.css';
import '../styles/forum/custom.css';
import "bootstrap/dist/js/bootstrap.min.js";
import 'bootstrap-validate/dist/bootstrap-validate.js';
import '../scripts/data/firebase';

import App from './views/app';

 
const app = new App({
  button: document.querySelector('#menu'),
  drawer: document.querySelector('#drawer'),
  content: document.querySelector('#maincontent'),
});



window.addEventListener('hashchange', () => {
  app.renderPage();
});
 
window.addEventListener('load', () => {
  app.renderPage();
});