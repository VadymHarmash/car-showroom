import './App.scss';
import Router from "./Router/Router";
import { BrowserRouter } from 'react-router-dom'

export default function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Router/>
        </BrowserRouter>
      </div>
  );
}