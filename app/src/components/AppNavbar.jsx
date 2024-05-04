import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from "react";

const AppNavbar = () => {
    return (
        <div className="container">
            <Navbar bg="primary" data-bs-theme="dark"  >
                <Container>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home..</Nav.Link>
                        <Nav.Link href="/about">About..</Nav.Link>
                        <Nav.Link href="/contact">Contact..</Nav.Link>
                        <Nav.Link href="/groups">groups..</Nav.Link>
                    </Nav>
                    <Nav className="justify-content-end">
                        <Nav.Link href="https://github.com/rama0534/event-organizer" target="_blank">GitHub</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}

export default AppNavbar;