import { Router } from "./components/Router";
import { NavBar } from "./components/NavBar";
import { Main } from "./components/styled/Main";
import { UserContextProvider } from "./utils/UserContext";
import "./App.css";

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <NavBar />
        <Main>
          <Router />
        </Main>
      </UserContextProvider>
    </div>
  );
}

export default App;
