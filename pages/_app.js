import "styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Layout from "components/layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Container>
        <Component {...pageProps} />
      </Container>
    </Layout>
  );
}
export default MyApp;
