import React, { useRef, useState } from 'react';
import './DiceRoller.css';
import diceRollSoundPath from '/assets/audio/dice-roll.mp3';

const DiceRoller = ({ onDiceRoll, hasRolledDice, setHasRolledDice }) => {
  const diceRef = useRef(null);
  const [rolling, setRolling] = useState(false);
  const [clickable, setClickable] = useState(true);

  const diceRollAudio = new Audio(diceRollSoundPath);
  diceRollAudio.preload = 'auto';

  const playDiceRollSound = () => {
    diceRollAudio.currentTime = 0;
    diceRollAudio.play();
  };

  const randomDice = () => {
    if (!clickable || hasRolledDice) return;

    setClickable(false);
    playDiceRollSound();
    setRolling(true);

    const random = Math.floor(Math.random() * 6) + 1;

    setTimeout(() => {
      setRolling(false);
      rollDice(random);
      setClickable(true);
    }, 300);
  };

  const rollDice = (random) => {
    switch (random) {
      case 1:
        diceRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
        break;
      case 2:
        diceRef.current.style.transform = 'rotateX(-90deg) rotateY(0deg)';
        break;
      case 3:
        diceRef.current.style.transform = 'rotateX(0deg) rotateY(90deg)';
        break;
      case 4:
        diceRef.current.style.transform = 'rotateX(0deg) rotateY(-90deg)';
        break;
      case 5:
        diceRef.current.style.transform = 'rotateX(90deg) rotateY(0deg)';
        break;
      case 6:
        diceRef.current.style.transform = 'rotateX(180deg) rotateY(0deg)';
        break;
      default:
        break;
    }

    onDiceRoll(random);
    setHasRolledDice(true);
  };

  return (
    <div className={`dice ${rolling ? 'rolling' : ''}`} ref={diceRef} onClick={randomDice}>
      <div className="face front"></div>
      <div className="face back"></div>
      <div className="face top"></div>
      <div className="face bottom"></div>
      <div className="face right"></div>
      <div className="face left"></div>
    </div>
  );
};

export default DiceRoller;
