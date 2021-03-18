import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

import ClassOne from "./Class/class_1";
import Classtwo from "./Class/class_2";
import ClassThree from "./Class/class_3";
import ClassFour from "./Class/class_4";
import RedexOne from "./Redux/Pattern_1";
import ReduxTwo from "./Redux/Pattern_2";
import ReduxThree from "./Redux/Pattern_3"
import ReduxFour from './Redux/MiddleWare'
import Mobx from './MobX/Container'

const Home = () => <p>React Edu Page</p>;

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
                  <Link to="/HOOK/1">Hook-Class-One</Link>
                  <br />
                  <small> * UseEffect, UseState </small>
                </li>
                <li class="list-group-item list-group-item-action">
                  <Link to="/HOOK/2">Hook-Class-Two</Link>
                  <br />
                  <small> * UseMemo, UseCallBack, UseRef </small>
                </li>
                <li class="list-group-item list-group-item-action">
                  <Link to="/DOM/1">react-router-dom-Class-One</Link>
                  <br />
                  <small> * Hook </small>
                </li>
                <li class="list-group-item list-group-item-action">
                  <Link to="/DOM/2">react-router-dom-Class-Two</Link>
                  <br />
                  <small> * Component, attribute </small>
                </li>
                <li class="list-group-item list-group-item-action">
                  <Link to="/REDUX/1">Redux-1</Link>
                  <br />
                  <small> * 기본 패턴 </small>
                </li>
                <li class="list-group-item list-group-item-action">
                  <Link to="/REDUX/2">Redux-2</Link>
                  <br />
                  <small> * Ducks 패턴 </small>
                </li>
                <li class="list-group-item list-group-item-action">
                  <Link to="/REDUX/3">Redux-3</Link>
                  <br />
                  <small> * ReduxToolkit 패턴 </small>
                </li>
                <li class="list-group-item list-group-item-action">
                  <Link to="/REDUX/4">Redux-4</Link>
                  <br />
                  <small> * MiddleWare </small>
                </li>
                <li class="list-group-item list-group-item-action">
                  <Link to="/Mobx">Mobx</Link>
                </li>
              </ul>
            </div>
            <div className={"p-1 w-100 m-1 overflow-auto h-100"}>
              <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/HOOK/1" component={ClassOne}></Route>
                <Route exact path="/HOOK/2" component={Classtwo}></Route>
                <Route exact path="/DOM/1" component={ClassThree}></Route>
                <Route exact path="/DOM/2" component={ClassFour}></Route>
                <Route exact path="/REDUX/1" component={RedexOne}></Route>
                <Route exact path="/REDUX/2" component={ReduxTwo}></Route>
                <Route exact path="/REDUX/3" component={ReduxThree}></Route>
                <Route exact path="/REDUX/4" component={ReduxFour}></Route>
                <Route exact path="/Mobx" component={Mobx}></Route>

              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
