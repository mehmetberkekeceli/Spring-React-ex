import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import About from "./pages/about/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import Footer from "./components/footer/Footer";
import VisitorCounter from "./components/visitor/VisitorCounter";
import News from "./pages/news/News";

function App(): JSX.Element {
  const { user } = useContext(Context);
  return (
    <Router>
      <TopBar />
      <Footer />
      <VisitorCounter />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/write" element={user ? <Write /> : <Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/News" element={<News />} />
        <Route path="/post/:blogId" element={<Single />} />
      </Routes>
    </Router>
  );
}

export default App;
