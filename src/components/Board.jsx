import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import './Board.css';
import Card from './Card';
import MessageDialog from './MessageDialog';
import { FaBeer, FaApple, FaCar, FaDog, FaHeart, FaStar, FaMusic, FaCamera, FaFilm } from 'react-icons/fa';

const Board = forwardRef((props, ref) => {
  const iconNames = [
    <FaBeer />, <FaApple />, <FaCar />, <FaDog />, <FaHeart />, <FaStar />,
    <FaMusic />, <FaCamera />, <FaFilm />
  ];

  const [showVictoryDialog, setShowVictoryDialog] = useState(false);
  const [showDefeatDialog, setShowDefeatDialog] = useState(false);


  const initCards = () => {
    const cardsData = [...iconNames, ...iconNames];
    for (let i = cardsData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardsData[i], cardsData[j]] = [cardsData[j], cardsData[i]];
    }
    return cardsData.map((icon, index) => ({
      id: index,
      iconName: icon,
      isFlipped: false,
      isMatched: false,
    }));
  };

  const [cards, setCards] = useState(initCards());
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 10;

  useEffect(() => {
    if (flippedIndices.length === 2) {
      checkForMatch();
    }
  }, [flippedIndices]);

  const initializeGame = () => {

    setCards(initCards());
    setFlippedIndices([]);
    setMatchedPairs([]);
    setAttempts(0);
    setShowVictoryDialog(false);
    setShowDefeatDialog(false);
  };

  const handleVictory = () => {

    setShowVictoryDialog(true);
  };

  const handleDefeat = () => {

    setShowDefeatDialog(true);
  };

  
  useImperativeHandle(ref, () => ({
    initializeGame
  }));

  const handleCardClick = (id) => {
    if (matchedPairs.includes(cards[id].iconName.type) || flippedIndices.includes(id) || flippedIndices.length >= 2) {

      return;
    }

    const newCards = [...cards];
    const cardIndex = newCards.findIndex((card) => card.id === id);
    newCards[cardIndex].isFlipped = true;
    const newFlippedIndices = [...flippedIndices, id];

    setCards(newCards);
    setFlippedIndices(newFlippedIndices);
  };

  const checkForMatch = () => {
    const [id1, id2] = flippedIndices;
    const card1 = cards.find((card) => card.id === id1);
    const card2 = cards.find((card) => card.id === id2);

    if (card1.iconName.type === card2.iconName.type) {
  
      const newMatchedPairs = [...matchedPairs, card1.iconName.type];
      const newCards = cards.map((card) => {
        if (flippedIndices.includes(card.id)) {
          return { ...card, isMatched: true };
        }
        return card;
      });

      setFlippedIndices([]);
      setMatchedPairs(newMatchedPairs);
      setCards(newCards);

      if (newMatchedPairs.length === cards.length / 2) {
        
        setShowVictoryDialog(true);
       
      }
    } else {
   
      setTimeout(() => {
        resetUnmatchedCards();
      }, 1000);
    }
  };

  const resetUnmatchedCards = () => {
    const newCards = cards.map((card) => {
      if (!card.isMatched) {
        return { ...card, isFlipped: false };
      }
      return card;
    });

    setFlippedIndices([]);
    setAttempts(attempts + 1);
    setCards(newCards);

    if (attempts + 1 >= maxAttempts) {

      setShowDefeatDialog(true);

    }
  };

  return (
    <div className="container">
      <div className="attempts">
        <p>Intentos: {attempts} / {maxAttempts}</p>
      </div>
      <div className="board">
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            isFlipped={card.isFlipped}
            handleClick={() => handleCardClick(card.id)}
            iconName={card.iconName}
          />
        ))}
      </div>


      {showVictoryDialog && (
        <MessageDialog
          message="¡Has ganado!"
          onClose={() => {
            setShowVictoryDialog(false);
            initializeGame(); 
          }}
        />
      )}


      {showDefeatDialog && (
        <MessageDialog
          message="¡Has perdido! Se ha superado el límite de intentos."
          onClose={() => {
            setShowDefeatDialog(false);
            initializeGame(); 
          }}
        />
      )}
    </div>
  );
});

export default Board;



