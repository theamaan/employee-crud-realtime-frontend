import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PersonListComponent from "./componets/PersonListComponent";
import HeaderComponent from "./componets/HeaderComponent";
import FooterComponent from "./componets/FooterComponent";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddPersonComponent from "./componets/AddPersonComponent";
import withNavigaiton from "./componets/withNavigation";

function App() {
  const PersonListComponentwithNavigation = withNavigaiton(PersonListComponent);
  const AddPersonComponentwithNavigation = withNavigaiton(AddPersonComponent);
  return (
    <div>
      <HeaderComponent />
      <div className="container">
        <Router>
          <Routes>
            <Route path="/" element={<PersonListComponentwithNavigation />}></Route>
            <Route path="/persons" element={<PersonListComponentwithNavigation />}></Route>
            <Route path="/add-person/:id" element={<AddPersonComponentwithNavigation />}></Route>
          </Routes>
        </Router>
      </div>
      <FooterComponent />
    </div>
  );
}

export default App;
