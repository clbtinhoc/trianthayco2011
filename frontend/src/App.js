import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

// import 'bootstrap/dist/css/bootstrap.min.css';
import FormToReg from "./Pages/form";
import AllWishes from "./Pages/allWishes";
function App() {
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FormToReg />} />
          <Route path="/getwish">
            <Route path=":teacher" element= {<AllWishes />} />
          </Route>
        </Routes>
      </BrowserRouter>
   
  );
}

export default App;
