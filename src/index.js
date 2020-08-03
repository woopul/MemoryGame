import React from 'react'
import ReactDOM from 'react-dom'
import './scss-utils/main.scss'
import App from './components/App/App'

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(<App/>, document.getElementById('app'))
});

