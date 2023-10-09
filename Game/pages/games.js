import { useState, useEffect, use } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import blank from "public/images/blank.png";
import { Container, Row, Col, Button } from "react-bootstrap";
import { set } from "react-hook-form";

function Game({ game }) {
  const [flippedTiles, setFlippedTiles] = useState([]);
  const [matchedTiles, setMatchedTiles] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const router = useRouter();

  const [pair, setPair] = useState([
    { id: 1, image: "/images/cheeseburger.png", flipped: false },
    { id: 2, image: "/images/fries.png", flipped: false },
    { id: 3, image: "/images/hotdog.png", flipped: false },
    { id: 4, image: "/images/cheeseburger.png", flipped: false },
    { id: 5, image: "/images/fries.png", flipped: false },
    { id: 6, image: "/images/hotdog.png", flipped: false },
  ]);

  // handle tile click to flip tile
  const handleTileClick = (id) => {
    const flippedTile1 = pair.find((image) => image.id === id);
    flippedTile1.flipped = true;
    setFlippedTiles([...flippedTiles, flippedTile1]);
  };

  // handle token click to claim token
  const handleTokenClick = async () => {
    const userId = localStorage.getItem("userId");
    console.log("userId", userId);
    if (userId) {
      await axios
        .patch("http://localhost:8080/users/" + userId, {
          tokens: 100,
        })
        .then(() => {
          alert("You have received 100 tokens!");
          router.push("/FAQ");
        });
    } else {
      alert("Please login to receive tokens");
    }
  };

  useEffect(() => {
    if (matchedTiles.includes(pair.image)) return;
    console.log("flipped tiles useffect", flippedTiles);
    // check if there are 2 tiles flipped
    if (flippedTiles.length === 2) {
      const [tile1, tile2] = flippedTiles;
      // check if the 2 flipped tiles match
      if (tile1.image === tile2.image) {
        setMatchedTiles([...matchedTiles, tile1.image, tile2.image]);
        console.log("matched");
        setFlippedTiles([]);
      } else {
        setTimeout(() => {
          setFlippedTiles([]);
          setMatchedTiles([]);
          tile1.flipped = false;
          tile2.flipped = false;
          setPair(pair.map((item) => ({ ...item, flipped: false })));
          console.log("not matched");
        }, 1000);
      }
    }
  }, [flippedTiles]);

  useEffect(() => {
    if (matchedTiles.length == 6) {
      console.log("game over");
      setGameOver(true);
      document.getElementById("tokenBtn").style.display = "block";
    }
  }, [matchedTiles]);

  return (
    <div>
      <Nav />
      <header className="header">
        <h1>Memory Game</h1>
        <span>Match pictures as fast as possible</span>
      </header>
      <section className="section">
        <Container>
          <Row className="justify-content-md-center mb-4">
            {pair.map((tile, index) => {
              const { id, image, flipped } = tile;
              return (
                <Col xs="6" md="6" key={index}>
                  <div
                    onClick={() => {
                      handleTileClick(id);
                    }}
                    className={`tile ${
                      flippedTiles.includes(pair.image) ||
                      matchedTiles.includes(pair.image)
                        ? "flipped"
                        : ""
                    }`}
                  >
                    <Image
                      src={flipped ? image : blank}
                      width={100}
                      height={100}
                      alt="tile"
                    />
                  </div>
                </Col>
              );
            })}
          </Row>

          <Button id="tokenBtn" onClick={handleTokenClick}>
            Claim Token
          </Button>
        </Container>
      </section>

      <Footer />
    </div>
  );
}

export default Game;
