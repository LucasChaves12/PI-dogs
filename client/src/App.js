import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LandingPage from './Components/LandingPage';
import Home from './Components/Home';
import DogCreate from './Components/CreateDog';
import Detail from './Components/DogDetail';
import QuizPage from './Components/QuizPage';



const App = () => {

  return (
      <BrowserRouter>
      <div className='App'>
        <Switch>
        <Route exact path='/' component = {LandingPage}/>
        <Route exact path='/home' component = {Home}/>
        <Route exact path='/dogs' component = {DogCreate}/>
        <Route exact path= '/home/:id' component = {Detail}/>
        </Switch>
        <Route exact path ='/quiz' component = {QuizPage}/>
      </div>
      </BrowserRouter>
  );
}

export default App;
