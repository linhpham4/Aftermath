import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import EditBillPage from "./pages/EditBillPage/EditBillPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:hostId" element={<HomePage />} />
        <Route path="/:hostId/edit/:billId" element={<EditBillPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
