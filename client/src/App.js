import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>React App</h1>
      </div>
    </Provider>
  );
}

export default App;
