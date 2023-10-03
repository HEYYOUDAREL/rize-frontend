import React from 'react';
import "./styles/AppNavbar.css";
import { Navbar, Container } from 'react-bootstrap';

export const AppNavbar = () => {
    
    return (
        <>
            <Navbar>
                <Container className='rize-logo'>
                <Navbar.Brand href="/">
                    <img
                    src={process.env.PUBLIC_URL + '/images/rize.jpg'}
                    alt="Rize"
                    height={80}
                    />{' '}
                </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    );
}