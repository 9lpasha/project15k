import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

let render = () => {
    ReactDOM.render(
        <App/>,
        document.getElementById('root')
    );
    console.log('observer')
}

export let observer = render
observer()