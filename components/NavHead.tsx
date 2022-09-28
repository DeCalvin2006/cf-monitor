import { Navbar, Nav } from "react-bootstrap";
import Head from "next/head";
export default function NavHead () {
  return (<div>
    <Head>
      <title>
        Codeforces Monitor
      </title>
    </Head>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">CF-Monitor</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {/* <Nav.Link href="/luogu/">洛谷</Nav.Link> */}
          <Nav.Link href="/cf/">Codeforces</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </div>
  );
}