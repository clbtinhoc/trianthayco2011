import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

// import 'bootstrap/dist/css/bootstrap.min.css';
import FormToReg from "./Pages/form";
function App() {
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FormToReg />} />
        </Routes>
      </BrowserRouter>
   
  );
}

export default App;
