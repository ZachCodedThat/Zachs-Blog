import Link from "next/link";
import Container from "./Container";

const Header = () => {
  return (
    <Container>
      <header>
        <div className="header-container">
          <Link href="/" passHref>
            <h2>Zachs Blog</h2>
          </Link>
        </div>
      </header>
    </Container>
  );
};

export default Header;
