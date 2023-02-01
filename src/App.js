import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import GlobalStyle from "./styles/GlobalStyle";

function App() {
  return (
    <>
      <Router>
        <GlobalStyle />
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

// lib react-select, como passar os itens selecionados para outro campo
