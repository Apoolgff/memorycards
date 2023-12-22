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

  // Función para inicializar las cartas
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

  const [cards, setCards] = useState(initCards()); // Inicializa las cartas usando la función initCards
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
    // Restablece el juego volviendo a inicializar las cartas
    setCards(initCards());
    setFlippedIndices([]);
    setMatchedPairs([]);
    setAttempts(0);
    setShowVictoryDialog(false);
    setShowDefeatDialog(false);
  };

  const handleVictory = () => {
    // Muestra el mensaje de victoria
    setShowVictoryDialog(true);
  };

  const handleDefeat = () => {
    // Muestra el mensaje de derrota
    setShowDefeatDialog(true);
  };

  // Asegúrate de que initializeGame sea accesible a través de la referencia
  useImperativeHandle(ref, () => ({
    initializeGame
  }));

  const handleCardClick = (id) => {
    if (matchedPairs.includes(cards[id].iconName.type) || flippedIndices.includes(id) || flippedIndices.length >= 2) {
      // Si la carta ya está emparejada, ya está volteada o ya hay dos cartas volteadas, no hacer nada
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
      // Si las cartas coinciden, agrégalas a las cartas emparejadas
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
        // Si todas las cartas están emparejadas, mostrar un mensaje de victoria
        //alert('¡Has ganado!');
        setShowVictoryDialog(true);
        //initializeGame();
      }
    } else {
      // Si no coinciden, llama a la función para voltear automáticamente las cartas no coincidentes
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
      // Si se supera el límite de intentos, mostrar un mensaje de derrota
      //alert('¡Has perdido! Se ha superado el límite de intentos.');
      setShowDefeatDialog(true);
      //initializeGame();
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

      {/* Mostrar el cuadro de diálogo de victoria */}
      {showVictoryDialog && (
        <MessageDialog
          message="¡Has ganado!"
          onClose={() => {
            setShowVictoryDialog(false);
            initializeGame(); // Reiniciar el juego
          }}
        />
      )}

      {/* Mostrar el cuadro de diálogo de derrota */}
      {showDefeatDialog && (
        <MessageDialog
          message="¡Has perdido! Se ha superado el límite de intentos."
          onClose={() => {
            setShowDefeatDialog(false);
            initializeGame(); // Reiniciar el juego
          }}
        />
      )}
    </div>
  );
});

export default Board;



