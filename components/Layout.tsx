import Header from '../components/Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      {/* <Meta Page here?? /> */}
      <Header />
      <main className="main-body">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
