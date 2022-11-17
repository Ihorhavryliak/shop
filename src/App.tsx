import { Header, Navbar } from "./components";
import "./sass/main.scss";
import { AppRouters } from "./AppRouters";

function App() {
  return (
    <>
      <Header />
      <Navbar />
      <AppRouters/>
    </>
  );
}

export default App;
