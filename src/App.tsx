import { Outlet } from "react-router";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <Button>Hello world</Button>
      <h1>what the hell</h1>
      <Outlet />
    </>
  );
}

export default App;
