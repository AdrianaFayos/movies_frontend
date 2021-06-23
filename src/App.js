import './Global.css';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './container/Home/Home';
import Login from './container/Login/Login';
import UserProfile from './container/UserProfile/UserProfile';
import AdminHome from './container/AdminHome/AdminHome';
import UserUpdate from './container/UserUpdate/UserUpdate';
import Register from './container/Register/Register';
import AdminAllUsers from './container/AdminAllUsers/AdminAllUsers';
import AdminAllOrders from './container/AdminAllOrders/AdminAllOrders';
import ClientInfo from './container/ClientInfo/ClientInfo';
import UserOrders from './container/UserOrders/UserOrders';
import SearchMovie from './container/SearchMovie/SearchMovie';

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
          <Route path="/register" exact component={Register}/>
          <Route path="/allusers" exact component={AdminAllUsers}/>
          <Route path="/allorders" exact component={AdminAllOrders}/>
          <Route path="/clientinfo" exact component={ClientInfo}/>
          <Route path="/orders" exact component={UserOrders}/>
          <Route path="/search" exact component={SearchMovie}/>

        </Switch>
        
        
      </BrowserRouter>
    </div>
  );
}

export default App;
