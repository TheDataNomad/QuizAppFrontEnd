import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
 
import Homepage from './components/Hompage';
import SignUp from './components/SignUP';
import Quiz from './components/Quiz';
import WallPage from './components/WallPage';
import LogIn from './components/loginSide';
 
class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
            <Switch>
             <Route path="/" component={Homepage} exact/>
             <Route path="/profile" component={WallPage} />
             <Route path="/quiz" component={Quiz}/>
             <Route path="/signup" component={SignUp}/>
             <Route path="/login" component={LogIn}/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;