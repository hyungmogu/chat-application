import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';

function App() {
  return (
    <HashRouter>
        <main className="App">
          <Switch>
              <Route path="/chat" component={ChatScreen}/>
              <Route exact path="/signup" component={SignupScreen}/>
              <Route exact path="/" component={LoginScreen}/>
          </Switch>
        </main>
    </HashRouter>
  );
}

export default App;
