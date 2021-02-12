import logo from './logo.svg';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreatePrediction from './components/predictions.component';
import List from './pages/listMedicalCosts.page';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
         <Switch>
          <Route path="/listmedicalcosts"> <List /> </Route>
          <Route path="/" component={CreatePrediction} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
