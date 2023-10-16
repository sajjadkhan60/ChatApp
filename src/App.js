import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Chat, Register, Login } from "./pages/index";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </>
    </Provider>
  );
}

export default App;
