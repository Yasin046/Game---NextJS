import Footer from "@/components/Footer";
import LoginForm from "@/components/LoginForm";

function Home({ details }) {
  return (
    <div>
      <header className="header">
        <h1>Welcome to my website</h1>
      </header>

      <section className="section">
        <LoginForm />
      </section>

      <Footer />
    </div>
  );
}

export default Home;
