import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import CreateTodo from "./pages/CreateTodo/CreateTodo";
import NotFound from "./pages/NotFound/NotFound";
import Sidebar from "./components/Sidebar/Sidebar";
import { useEffect, useState } from "react";

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="flex items-start justify-center">
      <Sidebar isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />

      <main className="main">
        <Routes>
          <Route path="/" element={<Home isDark={isDark} />} />
          <Route path="/create" element={<CreateTodo isDark={isDark} />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
