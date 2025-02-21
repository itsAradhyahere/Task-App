import { BrowserRouter as Router, Route, Routes } from "react-router";
import Home from "./pages/home";
import Global404 from "./pages/404";
import Layout from "./pages/dashboard/layout";
import Dashboard from "./pages/dashboard/routes/dashboard";
import Inbox from "./pages/dashboard/routes/inbox";
import Notes from "./pages/dashboard/routes/notes";
import Todos from "./pages/dashboard/routes/todos";
import Settings from "./pages/dashboard/routes/settings";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="notes" element={<Notes />} />
          <Route path="todos" element={<Todos />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Global404 />} />
      </Routes>
    </Router>
  );
}
