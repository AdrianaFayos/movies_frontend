import './Global.css';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './container/Home/Home';
import Login from './container/Login/Login';
import UserProfile from './container/UserProfile/UserProfile';
import AdminHome from './container/AdminHome/AdminHome';
import UserUpdate from './container/UserUpdate/UserUpdate';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      
      {/* <Header /> */}
        
        <Switch>
        
          <Route path="/" exact component={Home}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/profile" exact component={UserProfile}/>
          <Route path="/adminhome" exact component={AdminHome}/>
          <Route path="/updateuser" exact component={UserUpdate}/>
        
        </Switch>
        
        
      </BrowserRouter>
    </div>
  );
}

export default App;
