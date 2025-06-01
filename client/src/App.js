import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layout";
import Dashboard from "./order/dashboard";
//import CategoryList from "./category/category-list";
import TaskList from "./task/dashboard";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/taskList" element={<TaskList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;