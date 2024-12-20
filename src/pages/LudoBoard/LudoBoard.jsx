import React, { useState } from 'react';
import './LudoBoard.css';
import DiceRoller from '../../components/DiceRoller/DiceRoller';
import moveSoundPath from '/assets/audio/move.mp3';

import redTokenIcon from "/assets/icons/token-red.svg";
import greenTokenIcon from "/assets/icons/token-green.svg";
import yellowTokenIcon from "/assets/icons/token-yellow.svg";
import blueTokenIcon from "/assets/icons/token-blue.svg";

const tokenIcons = {
    red: redTokenIcon,
    green: greenTokenIcon,
    yellow: yellowTokenIcon,
    blue: blueTokenIcon
};

const ludoBoard = [
    ['RH', 'RH', 'RH', 'RH', 'RH', 'RH', 'WP', 'ART', 'WP', 'GH', 'GH', 'GH', 'GH', 'GH', 'GH'],
    ['RH', 'RH', 'RH', 'RH', 'RH', 'RH', 'WP', 'GSP', 'GS', 'GH', 'GH', 'GH', 'GH', 'GH', 'GH'],
    ['RH', 'RH', 'RH', 'RH', 'RH', 'RH', 'ST', 'GSP', 'WP', 'GH', 'GH', 'GH', 'GH', 'GH', 'GH'],
    ['RH', 'RH', 'RH', 'RH', 'RH', 'RH', 'WP', 'GSP', 'WP', 'GH', 'GH', 'GH', 'GH', 'GH', 'GH'],
    ['RH', 'RH', 'RH', 'RH', 'RH', 'RH', 'WP', 'GSP', 'WP', 'GH', 'GH', 'GH', 'GH', 'GH', 'GH'],
    ['RH', 'RH', 'RH', 'RH', 'RH', 'RH', 'WP', 'GSP', 'WP', 'GH', 'GH', 'GH', 'GH', 'GH', 'GH'],
    ['WP', 'RS', 'WP', 'WP', 'WP', 'WP', 'C', 'C', 'C', 'WP', 'WP', 'WP', 'ST', 'WP', 'WP'],
    ['ARL', 'RSP', 'RSP', 'RSP', 'RSP', 'RSP', 'C', 'C', 'C', 'YSP', 'YSP', 'YSP', 'YSP', 'YSP', 'ARR'],
    ['WP', 'WP', 'ST', 'WP', 'WP', 'WP', 'C', 'C', 'C', 'WP', 'WP', 'WP', 'WP', 'YS', 'WP'],
    ['BH', 'BH', 'BH', 'BH', 'BH', 'BH', 'WP', 'BSP', 'WP', 'YH', 'YH', 'YH', 'YH', 'YH', 'YH'],
    ['BH', 'BH', 'BH', 'BH', 'BH', 'BH', 'WP', 'BSP', 'WP', 'YH', 'YH', 'YH', 'YH', 'YH', 'YH'],
    ['BH', 'BH', 'BH', 'BH', 'BH', 'BH', 'WP', 'BSP', 'WP', 'YH', 'YH', 'YH', 'YH', 'YH', 'YH'],
    ['BH', 'BH', 'BH', 'BH', 'BH', 'BH', 'WP', 'BSP', 'ST', 'YH', 'YH', 'YH', 'YH', 'YH', 'YH'],
    ['BH', 'BH', 'BH', 'BH', 'BH', 'BH', 'BS', 'BSP', 'WP', 'YH', 'YH', 'YH', 'YH', 'YH', 'YH'],
    ['BH', 'BH', 'BH', 'BH', 'BH', 'BH', 'WP', 'ARB', 'WP', 'YH', 'YH', 'YH', 'YH', 'YH', 'YH']
];

const redTokenPath = [
    { row: 6, col: 1 }, // RS
    { row: 6, col: 2 }, // WP
    { row: 6, col: 3 }, // WP
    { row: 6, col: 4 }, // WP
    { row: 6, col: 5 }, // WP

    { row: 5, col: 6 }, // WP
    { row: 4, col: 6 }, // WP
    { row: 3, col: 6 }, // WP
    { row: 2, col: 6 }, // WP
    { row: 1, col: 6 }, // WP
    { row: 0, col: 6 }, // WP

    { row: 0, col: 7 }, // WP

    { row: 0, col: 8 }, // WP
    { row: 1, col: 8 }, // GS
    { row: 2, col: 8 }, // WP
    { row: 3, col: 8 }, // WP
    { row: 4, col: 8 }, // WP
    { row: 5, col: 8 }, // WP

    { row: 6, col: 9 }, // WP
    { row: 6, col: 10 }, // WP
    { row: 6, col: 11 }, // WP
    { row: 6, col: 12 }, // WP
    { row: 6, col: 13 }, // WP
    { row: 6, col: 14 }, // WP

    { row: 7, col: 14 }, // WP

    { row: 8, col: 14 }, // WP
    { row: 8, col: 13 }, // YS
    { row: 8, col: 12 }, // WP
    { row: 8, col: 11 }, // WP
    { row: 8, col: 10 }, // WP
    { row: 8, col: 9 }, // WP

    { row: 9, col: 8 }, // WP
    { row: 10, col: 8 }, // WP
    { row: 11, col: 8 }, // WP
    { row: 12, col: 8 }, // WP
    { row: 13, col: 8 }, // WP
    { row: 14, col: 8 }, // WP

    { row: 14, col: 7 }, // WP

    { row: 14, col: 6 }, // WP
    { row: 13, col: 6 }, // BS
    { row: 12, col: 6 }, // WP
    { row: 11, col: 6 }, // WP
    { row: 10, col: 6 }, // WP
    { row: 9, col: 6 }, // WP

    { row: 8, col: 5 }, // WP
    { row: 8, col: 4 }, // WP
    { row: 8, col: 3 }, // WP
    { row: 8, col: 2 }, // WP
    { row: 8, col: 1 }, // WP
    { row: 8, col: 0 }, // WP

    { row: 7, col: 0 }, // WP

    { row: 7, col: 1 }, // RSP
    { row: 7, col: 2 }, // RSP
    { row: 7, col: 3 }, // RSP
    { row: 7, col: 4 }, // RSP
    { row: 7, col: 5 }, // RSP
    { row: 7, col: 6 }, // C
];

const greenTokenPath = [
    { row: 1, col: 8 }, // GS (starting point of Green)
    { row: 2, col: 8 }, // WP
    { row: 3, col: 8 }, // WP
    { row: 4, col: 8 }, // WP
    { row: 5, col: 8 }, // WP

    { row: 6, col: 9 }, // WP
    { row: 6, col: 10 }, // WP
    { row: 6, col: 11 }, // WP
    { row: 6, col: 12 }, // WP
    { row: 6, col: 13 }, // WP
    { row: 6, col: 14 }, // WP

    { row: 7, col: 14 }, // WP

    { row: 8, col: 14 }, // WP
    { row: 8, col: 13 }, // YS
    { row: 8, col: 12 }, // WP
    { row: 8, col: 11 }, // WP
    { row: 8, col: 10 }, // WP
    { row: 8, col: 9 }, // WP

    { row: 9, col: 8 }, // WP
    { row: 10, col: 8 }, // WP
    { row: 11, col: 8 }, // WP
    { row: 12, col: 8 }, // WP
    { row: 13, col: 8 }, // WP
    { row: 14, col: 8 }, // WP

    { row: 14, col: 7 }, // WP

    { row: 14, col: 6 }, // WP
    { row: 13, col: 6 }, // BS
    { row: 12, col: 6 }, // WP
    { row: 11, col: 6 }, // WP
    { row: 10, col: 6 }, // WP
    { row: 9, col: 6 }, // WP

    { row: 8, col: 5 }, // WP
    { row: 8, col: 4 }, // WP
    { row: 8, col: 3 }, // WP
    { row: 8, col: 2 }, // WP
    { row: 8, col: 1 }, // WP
    { row: 8, col: 0 }, // WP

    { row: 7, col: 0 }, // WP

    { row: 6, col: 0 }, // WP
    { row: 6, col: 1 }, // RS
    { row: 6, col: 2 }, // WP
    { row: 6, col: 3 }, // WP
    { row: 6, col: 4 }, // WP
    { row: 6, col: 5 }, // WP

    { row: 5, col: 6 }, // WP
    { row: 4, col: 6 }, // WP
    { row: 3, col: 6 }, // WP
    { row: 2, col: 6 }, // WP
    { row: 1, col: 6 }, // WP
    { row: 0, col: 6 }, // WP

    { row: 0, col: 7 }, // WP

    { row: 1, col: 7 }, // GSP
    { row: 2, col: 7 }, // GSP
    { row: 3, col: 7 }, // GSP
    { row: 4, col: 7 }, // GSP
    { row: 5, col: 7 }, // GSP

    { row: 6, col: 7 }, // C
];

const yellowTokenPath = [
    { row: 8, col: 13 }, // YS (starting point of Yellow)
    { row: 8, col: 12 }, // WP
    { row: 8, col: 11 }, // WP
    { row: 8, col: 10 }, // WP
    { row: 8, col: 9 },  // WP

    { row: 9, col: 8 }, // WP
    { row: 10, col: 8 }, // WP
    { row: 11, col: 8 }, // WP
    { row: 12, col: 8 }, // WP
    { row: 13, col: 8 }, // WP
    { row: 14, col: 8 }, // WP

    { row: 14, col: 7 }, // WP

    { row: 14, col: 6 }, // WP
    { row: 13, col: 6 }, // BS
    { row: 12, col: 6 }, // WP
    { row: 11, col: 6 }, // WP
    { row: 10, col: 6 }, // WP
    { row: 9, col: 6 }, // WP

    { row: 8, col: 5 }, // WP
    { row: 8, col: 4 }, // WP
    { row: 8, col: 3 }, // WP
    { row: 8, col: 2 }, // WP
    { row: 8, col: 1 }, // WP
    { row: 8, col: 0 }, // WP

    { row: 7, col: 0 }, // WP

    { row: 6, col: 0 }, // WP
    { row: 6, col: 1 }, // RS
    { row: 6, col: 2 }, // WP
    { row: 6, col: 3 }, // WP
    { row: 6, col: 4 }, // WP
    { row: 6, col: 5 }, // WP

    { row: 5, col: 6 }, // WP
    { row: 4, col: 6 }, // WP
    { row: 3, col: 6 }, // WP
    { row: 2, col: 6 }, // WP
    { row: 1, col: 6 }, // WP
    { row: 0, col: 6 }, // WP

    { row: 0, col: 7 }, // WP

    { row: 0, col: 8 }, // WP
    { row: 1, col: 8 }, // GS
    { row: 2, col: 8 }, // WP
    { row: 3, col: 8 }, // WP
    { row: 4, col: 8 }, // WP
    { row: 5, col: 8 }, // WP

    { row: 6, col: 9 }, // WP
    { row: 6, col: 10 }, // WP
    { row: 6, col: 11 }, // WP
    { row: 6, col: 12 }, // WP
    { row: 6, col: 13 }, // WP
    { row: 6, col: 14 }, // WP

    { row: 7, col: 14 }, // WP

    { row: 7, col: 13 }, // YSP
    { row: 7, col: 12 }, // YSP
    { row: 7, col: 11 }, // YSP
    { row: 7, col: 10 }, // YSP
    { row: 7, col: 9 }, // YSP

    { row: 7, col: 8 }, // C

];

const blueTokenPath = [
    { row: 13, col: 6 }, // BS (starting point of Blue)
    { row: 12, col: 6 }, // WP
    { row: 11, col: 6 }, // WP
    { row: 10, col: 6 }, // WP
    { row: 9, col: 6 },  // WP

    { row: 8, col: 5 }, // WP
    { row: 8, col: 4 }, // WP
    { row: 8, col: 3 }, // WP
    { row: 8, col: 2 }, // WP
    { row: 8, col: 1 }, // WP
    { row: 8, col: 0 }, // WP

    { row: 7, col: 0 }, // WP

    { row: 6, col: 0 }, // WP
    { row: 6, col: 1 }, // RS
    { row: 6, col: 2 }, // WP
    { row: 6, col: 3 }, // WP
    { row: 6, col: 4 }, // WP
    { row: 6, col: 5 }, // WP

    { row: 5, col: 6 }, // WP
    { row: 4, col: 6 }, // WP
    { row: 3, col: 6 }, // WP
    { row: 2, col: 6 }, // WP
    { row: 1, col: 6 }, // WP
    { row: 0, col: 6 }, // WP

    { row: 0, col: 7 }, // WP

    { row: 0, col: 8 }, // WP
    { row: 1, col: 8 }, // GS
    { row: 2, col: 8 }, // WP
    { row: 3, col: 8 }, // WP
    { row: 4, col: 8 }, // WP
    { row: 5, col: 8 }, // WP

    { row: 6, col: 9 }, // WP
    { row: 6, col: 10 }, // WP
    { row: 6, col: 11 }, // WP
    { row: 6, col: 12 }, // WP
    { row: 6, col: 13 }, // WP
    { row: 6, col: 14 }, // WP

    { row: 7, col: 14 }, // WP

    { row: 8, col: 14 }, // WP
    { row: 8, col: 13 }, // YS
    { row: 8, col: 12 }, // WP
    { row: 8, col: 11 }, // WP
    { row: 8, col: 10 }, // WP
    { row: 8, col: 9 }, // WP

    { row: 9, col: 8 }, // WP
    { row: 10, col: 8 }, // WP
    { row: 11, col: 8 }, // WP
    { row: 12, col: 8 }, // WP
    { row: 13, col: 8 }, // WP
    { row: 14, col: 8 }, // WP

    { row: 14, col: 7 }, // WP

    { row: 13, col: 7 }, // BSP
    { row: 12, col: 7 }, // BSP
    { row: 11, col: 7 }, // BSP
    { row: 10, col: 7 }, // BSP
    { row: 9, col: 7 }, // BSP

    { row: 8, col: 7 }, // C p56
];



const getClassFromValue = (value) => {
    switch (value.trim()) {
        case 'RH': return 'red-home';
        case 'GH': return 'green-home';
        case 'BH': return 'blue-home';
        case 'YH': return 'yellow-home';
        case 'WP': return 'white-path';
        case 'C': return 'center';
        case 'RS': return 'red-start';
        case 'GS': return 'green-start';
        case 'BS': return 'blue-start';
        case 'YS': return 'yellow-start';
        case 'RSP': return 'red-safe-path';
        case 'GSP': return 'green-safe-path';
        case 'BSP': return 'blue-safe-path';
        case 'YSP': return 'yellow-safe-path';
        case 'ST': return 'star-cell';
        case 'ART': return 'arrow-cell-top';
        case 'ARL': return 'arrow-cell-left';
        case 'ARB': return 'arrow-cell-bottom';
        case 'ARR': return 'arrow-cell-right';
        default: return 'empty';
    }
};

const LudoBoard = () => {

    const [tokens, setTokens] = useState({
        red: [
            { id: 1, position: null, status: 'out', row: null, col: null },
            { id: 2, position: null, status: 'out', row: null, col: null },
            { id: 3, position: null, status: 'out', row: null, col: null },
            { id: 4, position: null, status: 'out', row: null, col: null },
        ],
        green: [
            { id: 5, position: null, status: 'out', row: null, col: null },
            { id: 6, position: null, status: 'out', row: null, col: null },
            { id: 7, position: null, status: 'out', row: null, col: null },
            { id: 8, position: null, status: 'out', row: null, col: null },
        ],
        yellow: [
            { id: 9, position: null, status: 'out', row: null, col: null },
            { id: 10, position: null, status: 'out', row: null, col: null },
            { id: 11, position: null, status: 'out', row: null, col: null },
            { id: 12, position: null, status: 'out', row: null, col: null },
        ],
        blue: [
            { id: 13, position: null, status: 'out', row: null, col: null },
            { id: 14, position: null, status: 'out', row: null, col: null },
            { id: 15, position: null, status: 'out', row: null, col: null },
            { id: 16, position: null, status: 'out', row: null, col: null },
        ],
    });

    const [clickedTokenId, setClickedTokenId] = useState(null);
    const [cellIndex, setCellIndex] = useState('');
    const [diceValue, setDiceValue] = useState(null);
    const [currentPlayer, setCurrentPlayer] = useState('red');
    const [currentTokenPosition, setCurrentTokenPosition] = useState({ tokenId: null, row: null, col: null, status: null });
    const [eligibleTokens, setEligibleTokens] = useState([]);
    const [hasRolledDice, setHasRolledDice] = useState(false);
    const tokenPaths = { red: redTokenPath, green: greenTokenPath, yellow: yellowTokenPath, blue: blueTokenPath };


    // Click handler for displaying row and column index (unchanged)
    const handleCellClick = (rowIndex, colIndex) => {
        setCellIndex(`Cell clicked is at: row: ${rowIndex}, col: ${colIndex}`);
    };

    // Function to detect token status based on position
    const getTokenStatus = (position) => {
        if (position === 0 || position === 13 || position === 26 || position === 39) return 'home';
        if (position >= 51 && position <= 55) return 'safe';
        if (position === 8) return 'star';
        if (position === 56) return 'win';
        return 'in-play';
    };

    // Utility function to get the next player in the rotation
    const getNextPlayer = (currentPlayer, players) => {
        const currentIndex = players.indexOf(currentPlayer);
        return players[(currentIndex + 1) % players.length];
    };

    const findEligibleTokens = (tokens, currentPlayer, diceValue) => {
        return tokens[currentPlayer].filter(token => {
            const currentPosition = token.position;
            const status = token.status;

            if (status === 'out' && diceValue === 6) {
                return true;
            }

            if (status === 'home' || status === 'in-play' || status === 'star') {
                return true;
            }

            if (status === 'safe' && currentPosition >= 51 && currentPosition <= 55) {
                const potentialPosition = currentPosition + diceValue;

                return potentialPosition <= 56;
            }

            if (status === 'in-play' && currentPosition < 56) {
                const potentialPosition = currentPosition + diceValue;

                return potentialPosition <= 56;
            }

            return false;
        });
    };

    // Function to handle movement of a token
    const moveToken = (tokens, player, tokenId, newPosition, tokenPath) => {
        const updatedTokens = tokens[player].map((token) => {
            if (token.id === tokenId) {
                const { row, col } = tokenPath[newPosition];
                const newStatus = getTokenStatus(newPosition);
                return {
                    ...token,
                    position: newPosition,
                    status: newStatus,
                    row,
                    col,
                };
            }
            return token;
        });
        return { ...tokens, [player]: updatedTokens };
    };

    // Function to check for kills
    const checkForKill = (tokens, currentPlayer, row, col) => {
        const players = ['red', 'green', 'yellow', 'blue'];
        players.forEach(player => {
            if (player !== currentPlayer) {
                tokens[player] = tokens[player].map(token => {
                    if (token.row === row && token.col === col && token.status === 'in-play') {
                        return { ...token, position: null, status: 'out', row: null, col: null };
                    }
                    return token;
                });
            }
        });
        return tokens;
    };

    // Handle Dice Roll: Update to accept dice value from DiceRoller
    const handleDiceRoll = (rolledValue) => {
        if (!hasRolledDice) {
            setDiceValue(rolledValue);
            const eligible = findEligibleTokens(tokens, currentPlayer, rolledValue);
            setEligibleTokens(eligible);
            setHasRolledDice(true);

            if (eligible.length === 0 && rolledValue !== 6) {
                setTimeout(() => {
                    setCurrentPlayer(getNextPlayer(currentPlayer, ['red', 'green', 'yellow', 'blue']));
                    setHasRolledDice(false);
                }, 300);
            }
        }
    };

    // Preload and prepare the move sound once
    const moveSoundAudio = new Audio(moveSoundPath);
    moveSoundAudio.preload = 'auto';

    // Function to play the move sound
    const playMoveSound = () => {
        moveSoundAudio.currentTime = 0;
        moveSoundAudio.play();
    };



    // Move the token with animation
    const moveTokenWithAnimation = (player, tokenId, diceRoll) => {
        const token = tokens[player].find(t => t.id === tokenId);
        if (!token) return;

        let currentPosition = token.position === null ? -1 : token.position;
        let newPosition;

        if (token.status === 'out' && diceRoll === 6) {
            newPosition = 0;
        } else if (token.position !== null) {
            newPosition = (token.position + diceRoll) % tokenPaths[player].length;
        } else {
            return;
        }

        let currentStep = 0;
        const steps = Math.abs(newPosition - currentPosition);
        const interval = setInterval(() => {
            if (currentStep < steps) {
                const nextPosition = (currentPosition + currentStep + 1) % tokenPaths[player].length;
                setTokens(prevTokens => moveToken(prevTokens, player, tokenId, nextPosition, tokenPaths[player]));
                currentStep++;

                playMoveSound();

            } else {
                clearInterval(interval);
                setTokens(prevTokens => checkForKill(prevTokens, player, tokenPaths[player][newPosition].row, tokenPaths[player][newPosition].col));
                if (diceRoll !== 6) {
                    setCurrentPlayer(getNextPlayer(currentPlayer, ['red', 'green', 'yellow', 'blue']));
                }
                setHasRolledDice(false);
            }
        }, 300);
    };

    // Handle Token Click: Ensure the player selects a token after rolling
    const handleTokenClick = (tokenId) => {
        const selectedToken = eligibleTokens.find(token => token.id === tokenId);
        if (selectedToken) {
            moveTokenWithAnimation(currentPlayer, tokenId, diceValue);

            setEligibleTokens([]);
            setHasRolledDice(false);

            if (diceValue !== 6) {
                setTimeout(() => {
                    setCurrentPlayer(getNextPlayer(currentPlayer, ['red', 'green', 'yellow', 'blue']));
                }, 300);
            }
        }
    };


    return (
        <div className="board-container">
            <img className="background" src="/assets/background.jpg" alt="background" />
            <div className="ludo-board">
                {Array.from({ length: ludoBoard[0].length }).map((_, colIndex) => (
                    <div key={colIndex} className="column">
                        {ludoBoard.map((row, rowIndex) => (
                            <div
                                key={rowIndex}
                                className={`cell ${getClassFromValue(row[colIndex])}`}
                                onClick={() => handleCellClick(rowIndex, colIndex)}
                            >

                                {getClassFromValue(row[colIndex]) === 'star-cell' && (
                                    <img src="assets/icons/ludo-star.svg" alt="Star" className="star-icon" />
                                )}
                                {getClassFromValue(row[colIndex]) === 'arrow-cell-top' && (
                                    <img src="assets/icons/ludo-arrow-bottom.svg" className="arrow-icon" alt="Arrow Top" />
                                )}
                                {getClassFromValue(row[colIndex]) === 'arrow-cell-left' && (
                                    <img src="assets/icons/ludo-arrow-right.svg" className="arrow-icon" alt="Arrow Right" />
                                )}
                                {getClassFromValue(row[colIndex]) === 'arrow-cell-bottom' && (
                                    <img src="assets/icons/ludo-arrow-top.svg" className="arrow-icon" alt="Arrow Bottom" />
                                )}
                                {getClassFromValue(row[colIndex]) === 'arrow-cell-right' && (
                                    <img src="assets/icons/ludo-arrow-left.svg" className="arrow-icon" alt="Arrow Left" />
                                )}

                                {['red', 'green', 'yellow', 'blue'].map(color =>
                                    tokens[color]
                                        .filter(token =>
                                            token.position !== null &&
                                            eval(`${color}TokenPath`)[token.position].row === rowIndex &&
                                            eval(`${color}TokenPath`)[token.position].col === colIndex
                                        )
                                        .map((token, index, tokenArray) => (
                                            <div
                                                key={token.id}
                                                className={`token-container token-group ${tokenArray.length > 1 ? 'multiple-tokens' : ''}`}
                                            >
                                                <div
                                                    className={`token ${color}-token`}
                                                    onClick={() => handleTokenClick(token.id)}
                                                >
                                                    <img src={tokenIcons[color]} alt={`${color} token`} />
                                                </div>
                                            </div>
                                        ))
                                )}

                            </div>
                        ))}
                    </div>
                ))}

                {['red', 'green', 'yellow', 'blue'].map(color => (
                    <div className={`out-tokens ${color}`} key={color}>
                        {tokens[color].map((token) => (
                            <div
                                key={token.id}
                                className={`out-token ${color}-out-token ${currentPlayer === color ? 'animate' : ''}`} // Apply animation class if it's the current player's turn
                                onClick={() => token.status === 'out' && handleTokenClick(token.id)} // Only clickable if the token is 'out'
                            >
                                {token.status === 'out' && (
                                    < img src={tokenIcons[color]} alt={`${color} token`} />
                                )}
                            </div>
                        ))}
                    </div>
                ))}

                <div className="board-center">
                    <div className="triangle red"></div>
                    <div className="triangle yellow"></div>
                    <div className="triangle green"></div>
                    <div className="triangle blue"></div>
                </div>
            </div>

            <div className="row">
                {['red', 'green', 'yellow', 'blue'].map(color => (
                    <div className={`dice-container ${color}-background`} key={color}>
                        {currentPlayer === color && (
                            <DiceRoller
                                onDiceRoll={handleDiceRoll}
                                hasRolledDice={hasRolledDice}
                                setHasRolledDice={setHasRolledDice}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* <p>Current turn: {currentPlayer.toUpperCase()}</p>

            {currentTokenPosition.tokenId && (
                <p>
                    Token {currentTokenPosition.tokenId} is at position:
                    {` row: ${currentTokenPosition.row}, col: ${currentTokenPosition.col} and status is: ${currentTokenPosition.status}`}
                </p>
            )}

            {clickedTokenId && (
                <p>Clicked Token ID: {clickedTokenId}</p>
            )}

            <p>{cellIndex}</p> */}

        </div>
    );
};

export default LudoBoard;
