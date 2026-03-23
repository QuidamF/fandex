import './styles/global.css'
import { useEffect } from "react";
import { getItems } from "./services/api";

function App() {

  useEffect(() => {
    getItems().then(data => console.log(data));
  }, []);

  return <h1>FanDex</h1>;
}

export default App;