import './App.css';
import {Fragment} from 'react';
import InputNotice from './components/inputNotice';
import ListNotice from './components/listNotice';

function App() {
  return (
    <Fragment>
      <div className='container' >
      <InputNotice/>
      <ListNotice/>
      </div>
      
    </Fragment>
  );
}

export default App;
