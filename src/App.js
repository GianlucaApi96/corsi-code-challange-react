import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ReviewComponent from "./Components/ReviewComponent";
import LoginComponent from "./Components/LoginComponent";
import ByeComponent from './Components/ByeComponent'
import AuthRoute from "./Api/AuthRoute";
import ReviewListComponent from "./Components/ReviewListComponent";

function App() {
  return (
    <div className="App">
        <Router>
            <Route path="/" exact component={LoginComponent}></Route>
            <AuthRoute path="/review" exact component={ReviewComponent}></AuthRoute>
            <AuthRoute path="/bye" exact component={ByeComponent}></AuthRoute>
            <AuthRoute path="/reviews" exact component={ReviewListComponent}></AuthRoute>
        </Router>

    </div>
  );
}

export default App;
