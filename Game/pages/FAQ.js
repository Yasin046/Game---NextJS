import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { useState } from "react";
import { Container, Accordion } from "react-bootstrap";
import axios from "axios";

function FAQ({ faqs }) {
  const [activeKey, setActiveKey] = useState("");

  const handleSelect = (key) => {
    setActiveKey(key);
    const selectedFaq = faqs.find((faq) => faq.title === key);
    if (selectedFaq) {
      fetch("/api/faq", {
        method: "POST",
        body: JSON.stringify({
          title: selectedFaq.title,
          answer: selectedFaq.answer,
          timestamp: new Date().toISOString(),
        }),
      });
    }
  };
  const handleAccordionClick = async (faq) => {
    const currentDate = new Date().toISOString();
    const data = { ...faq, date: currentDate };
    const headers = {
      "Content-Type": "application/json",
    };

    console.log(data);
    try {
      await axios.post("http://localhost:8080/views", data, { headers });
      console.log("POST request successful");
    } catch (error) {
      console.log("POST request failed", error);
    }
  };
  return (
    <div>
      <Nav />
      <header className="header">
        <h1>FAQs Page</h1>
        <span>Let us answer</span>
      </header>

      <section className="section">
        <Container>
          <Accordion activeKey={activeKey} onSelect={handleSelect}>
            {faqs.map((faq, index) => (
              <Accordion.Item key={index} eventKey={index.toString()}>
                <Accordion.Header onClick={() => handleAccordionClick(faq)}>
                  {faq.title}
                </Accordion.Header>
                <Accordion.Body>{faq.answer}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Container>
      </section>

      <Footer />
    </div>
  );
}

export default FAQ;

export async function getServerSideProps() {
  const res = await fetch("http://localhost:8080/faqs");
  const faqs = await res.json();

  return {
    props: {
      faqs,
    },
  };
}
