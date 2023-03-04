import './SpaLayout.scss'
import { Link, Outlet } from "react-router-dom";
import { useState } from 'react'
import { Button } from 'react-bootstrap';

// Some silly react state proof-of-concept
const Count = props => {
  const { className, prefix, size, variant = 'primary' } = props;
  const [count, setCount] = useState(0)
  return (
    <Button
      size={size}
      variant={variant}
      className={className}
      onClick={
        () => setCount((count) => count + 1)
      }
    >
      {`${prefix} ${count}`}
    </Button>
  );
}

export const SpaLayout = () => {
  return (
    <div className='layoutContainer'>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <header>
        <div className="hfBox">
          {/* sync with App routes*/}
          {/* TODO better navigation*/}
          {/* <Navbar expand="lg">
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/charts">Charts{' '}</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar> */}
          {' '}
          <Link to="/">Charts</Link>
          {' | '}
          <Link to="/about">About</Link>
        </div>
      </header>
      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
      <footer>
        <div className="hfBox">
          Footer
          {' '}
          <Count
            className="hfButton"
            size="sm"
            prefix="Footer click state: "
            variant="secondary"
          />
        </div>
      </footer>
      {/* If a second footer is desired */}
      {/* <footer className="second">
        <Button className="hfButton" variant="info">Info</Button>{' '}
        <Button className="hfButton" variant="light">Light</Button>{' '}
      </footer> */}

    </div>
  );
}

