"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import "./styles.css";
import { useOnClickOutside } from "usehooks-ts";

export default function AnimatedCard() {
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    function onKeyDown(event: any) {
      if (event.key === "Escape") {
        setActiveCard(null);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <MotionConfig>
      <div className="bg-gray-300 cards-wrapper">
        {CARDS.map((card) => (
          <Card key={card.title} card={card} setActiveCard={setActiveCard} />
        ))}
        <AnimatePresence>
          {activeCard ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="overlay"
            />
          ) : null}
        </AnimatePresence>
        <AnimatePresence>
          {activeCard ? (
            <ActiveCard activeCard={activeCard} setActiveCard={setActiveCard} />
          ) : null}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

function ActiveCard({ activeCard, setActiveCard }: any) {
  const ref = useRef(null);
  useOnClickOutside(ref, () => setActiveCard(null));

  return (
    <motion.div
      ref={ref}
      layoutId={`card-${activeCard.title}`}
      className="card card-active"
      style={{ borderRadius: 10 }}
    >
      <div className="card-inner">
        <motion.img
          layoutId={`image-${activeCard.title}`}
          src={activeCard.image}
          alt="image"
          style={{ borderRadius: 0 }}
        />
        <motion.button
          layoutId={`close-button-${activeCard.title}`}
          className="close-button"
          aria-label="Close button"
          onClick={() => setActiveCard(null)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            height="20"
            width="20"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </motion.button>
        <motion.div
          layoutId={`card-content-${activeCard.title}`}
          className="active-card-content card-content"
        >
          <div className="card-text">
            <motion.h2
              layoutId={`card-heading-${activeCard.title}`}
              layout
              className="card-heading"
            >
              Game of the day
            </motion.h2>
          </div>
          <motion.div
            layoutId={`card-extra-info-${activeCard.title}`}
            className="extra-info"
            style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
          >
            <motion.img
              src={activeCard.logo}
              width={40}
              height={40}
              alt="play"
              layoutId={`card-game-image-${activeCard.title}`}
              className="rounded-lg"
            />
            <div className="desc-wrapper">
              <motion.span
                layoutId={`card-game-title-${activeCard.title}`}
                className="game-title"
              >
                {activeCard.title}
              </motion.span>
              <motion.span
                layoutId={`card-game-subtitle-${activeCard.title}`}
                className="game-subtitle"
              >
                {activeCard.description}
              </motion.span>
            </div>
            <motion.button
              layoutId={`card-button-${activeCard.title}`}
              layout
              className="get-button"
            >
              Get
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        layoutId={`card-long-description-${activeCard.title}`}
        className="long-description"
      >
        <p>
          <b>Are you ready?</b> {activeCard.longDescription}
        </p>
        <p>
          <b>The never ending adventure </b>
          In this game, players embark on a wild quest.
        </p>
      </motion.div>
    </motion.div>
  );
}

function Card({ card, setActiveCard }: any) {
  return (
    <motion.div
      layoutId={`card-${card.title}`}
      className="card"
      whileTap={{ scale: 0.98 }}
      onClick={() => setActiveCard(card)}
      style={{ borderRadius: 20 }}
    >
      <motion.img
        layoutId={`image-${card.title}`}
        src={card.image}
        alt="image"
        style={{ borderRadius: 20 }}
      />
      <motion.button
        aria-hidden
        tabIndex={-1}
        layoutId={`close-button-${card.title}`}
        className="close-button"
        style={{ opacity: 0 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          height="20"
          width="20"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </motion.button>
      <motion.div
        layoutId={`card-content-${card.title}`}
        className="card-content"
      >
        <div className="card-text">
          <motion.h2
            layoutId={`card-heading-${card.title}`}
            className="card-heading"
          >
            Game of the day
          </motion.h2>
        </div>
        <motion.div
          layoutId={`card-extra-info-${card.title}`}
          className="extra-info"
          style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
        >
          <motion.img
            src={card.logo}
            width={40}
            height={40}
            alt="play"
            layoutId={`card-game-image-${card.title}`}
            className="rounded-lg"
          />
          <div className="desc-wrapper">
            <motion.span
              layoutId={`card-game-title-${card.title}`}
              className="game-title"
            >
              {card.title}
            </motion.span>
            <motion.span
              layoutId={`card-game-subtitle-${card.title}`}
              className="game-subtitle"
            >
              {card.description}
            </motion.span>
          </div>
          <motion.button
            layoutId={`card-button-${card.title}`}
            className="get-button"
          >
            Get
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        layoutId={`card-long-description-${card.title}`}
        className="long-description"
        style={{ position: "absolute", top: "100%", opacity: 0 }}
      >
        <div>
          <p>
            <b>Are you ready?</b> {card.longDescription}
          </p>
          <p>
            <b>The never ending adventure</b>
            In this game, players embark on a wild quest.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

const CARDS = [
  {
    title: "Vikings",
    subtitle: "Clash of the Norse Warriors",
    description: "A game about vikings",
    longDescription:
      "A game about vikings, where you can play as a viking and fight other vikings. You can also build your own viking village and explore the world.",
    image: "/shared-store-card/game.webp",
    logo: "/shared-store-card/game-logo.webp",
  },
];
