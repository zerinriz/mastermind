import "./App.css";
import Rules from "./Rules";
import { Game } from "./Game";

function App() {
  return (
    <div className="App">
      <div>
        <h2 className="title"> MasterMind </h2>
        <Rules />
        <Game />
      </div>
    </div>
  );
}

export default App;
