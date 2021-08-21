import Link from "next/link";

const Header = () => {
  return (
    <header>
      <div className="header-container">
        <Link href="/" passHref>
          <h2>Zachs Blog</h2>
        </Link>
      </div>
    </header>
  );
};

export default Header;
