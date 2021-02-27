import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

import ClassOne from './Hook/class_1'
import Classtwo from './Hook/class_2'

const Home = () => <p>React Edu Page</p>

function App() {
  return (
    <div className="App h-100">
      <BrowserRouter>
        <div className="container-fluid h-100">
          <div className="d-flex p-2 flex-row h-100">
            <div className="p-1 border shadow-sm bg-light">
              <div class="h-3 text-primary">Menu</div>
              <ul class="list-group">
                <li class="list-group-item list-group-item-action">
                  <Link to="/HOOK/1">Hook-Class-One</Link><br />
                  <small> * UseEffect, UseState  </small>
                </li>
                <li class="list-group-item list-group-item-action">
                  <Link to="/HOOK/2">Hook-Class-Two</Link><br />
                  <small> * UseMemo, UseCallBack, UseRef  </small>
                </li>
                <li class="list-group-item list-group-item-action">Morbi leo risus</li>
                <li class="list-group-item list-group-item-action">Porta ac consectetur ac</li>
                <li class="list-group-item list-group-item-action">Vestibulum at eros</li>
              </ul>
            </div>
            <div className={"p-1 w-100 m-1 overflow-auto h-100"} >
              <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/HOOK/1" component={ClassOne}></Route>
                <Route exact path="/HOOK/2" component={Classtwo}></Route>
              </Switch>      
            </div>
          </div>
        </div>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
