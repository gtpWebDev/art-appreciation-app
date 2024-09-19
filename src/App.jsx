import "./App.css";

import { Outlet, Link } from "react-router-dom";

import ScrollToTop from "./scrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <TitleBar />
      <NavBar />
      <Sidebar />
      <main style={{ border: "1px solid black" }}>
        <h2>Main Content</h2>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

const TitleBar = () => {
  return (
    <header>
      <h1>Title Bar</h1>
      <hr />
    </header>
  );
};

const NavBar = () => {
  return (
    <nav>
      <h2>Nav Bar</h2>
      <Link to="/">Return to home</Link>
      <hr />
    </nav>
  );
};

const Sidebar = () => {
  <aside>{/* Empty currently */}</aside>;
};

const Footer = () => {
  return (
    <footer>
      <hr />
      <h2>Footer</h2>
    </footer>
  );
};

export default App;
