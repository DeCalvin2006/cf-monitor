import "../styles/applications.scss"
import { Container } from "react-bootstrap"
import NavHead from "../components/NavHead"
function MyApp ({ Component, pageProps }) {
  return (
    <Container>
      <NavHead />
      <Component {...pageProps} />
    </Container >
  );
}

export default MyApp
