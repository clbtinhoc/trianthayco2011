import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import FormToReg from "./Pages/form";
import AllWishes from "./Pages/allWishes";
import GetAWish from "./Pages/aWish";
import Navbar from "./Pages/navbar";
import Main from "./Pages/main";
import StartGetwish from "./Pages/find-wishes";
// The form is gonna be the main page lol
function App() {
  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/new-wish" element={<FormToReg />} />
        <Route path="/getwish">
          <Route path=":teacher" element={<AllWishes />} />
          <Route path=":teacher/:index" element={<GetAWish />} />
        </Route>
        <Route path="/start-getwish" element={<StartGetwish />}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
