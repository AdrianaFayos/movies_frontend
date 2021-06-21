import './Global.css';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './container/Home/Home';
import Login from './container/Login/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      
      {/* <Header /> */}
        
        <Switch>
        
          <Route path="/" exact component={Home}/>
          <Route path="/login" exact component={Login}/>

        
        </Switch>
        
        
      </BrowserRouter>
    </div>
  );
}

export default App;
