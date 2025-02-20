import { BrowserRouter as Router, Route, Routes } from "react-router";
import Home from "./pages/home";
import Global404 from "./pages/404";
import Dashboard from "./pages/dashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Global404 />} />
      </Routes>
    </Router>
  );
}
