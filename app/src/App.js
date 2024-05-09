import React, {useEffect, useState} from "react";
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import Home from "./components/Home";
import GroupList from "./components/GroupList";
import Contact from "./components/Contact";
import About from "./components/About";
import EditGroup from "./components/EditGroup";


const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        fetch('api/user', { credentials: 'include' })
            .then(response => response.text())
            .then(body => {
                if (body === '') {
                    setIsLoggedIn(false);
                } else {
                    setIsLoggedIn(true);
                }
            });
    }, [setIsLoggedIn])

  return (
      <Router>
          <AppNavbar isLoggedIn={isLoggedIn} />
          <Routes>
              <Route path="/" element={<Home setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              {isLoggedIn && (
                  <>
                      <Route path="/groups" element={<GroupList />} />
                      <Route path="/groups/:id" element={<EditGroup />} />
                  </>
              )}
          </Routes>
      </Router>
  );
}

export default App;
