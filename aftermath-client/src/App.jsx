import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import EditBillPage from "./pages/EditBillPage/EditBillPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit/:id" element={<EditBillPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
