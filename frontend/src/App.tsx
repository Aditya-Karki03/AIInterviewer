import { Outlet } from "react-router-dom";

function App() {
  return (
    <div
      className="       
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-900
      border
    "
    >
      <Outlet />
    </div>
  );
}

export default App;
