import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">DaniSoftVille!</span>
        </h1>
      </header>
      <main className="public__main">
        <p>
          Located in Beautiful Downtown Foo City, Dan D. Repairs provides a
          trained staff ready to meet your tech repair needs.
        </p>
        <address className="public__addr">
          DaniSoftVille
          <br />
          Rua de Cepaes 321
          <br />
          Braga 4705-002
          <br />
          <a href="tel:+15555555555">932278369</a>
        </address>
        <br />
        <p>Owner: Luis Hernández</p>
      </main>
      <footer>
        <Link to="/login">Employee Login</Link>
      </footer>
    </section>
  );
  return content;
};
export default Public;
