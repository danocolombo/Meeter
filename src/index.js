import React from 'react';
import ReactDOM from 'react-dom';
import Amplify, { Auth } from "aws-amplify";
import awsconfig from './aws-exports';
import App from './App';
Amplify.configure(awsconfig);



ReactDOM.render(<App />, document.getElementById('root'));
