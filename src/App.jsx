import { useState } from "react"
import { languages } from "./languages"
import { clsx } from "clsx"
import { getFarwellText, getRandomWord } from "./utils"
import Confetti from "react-confetti"

export default function Hangman() {
        // State values
        // lazy state initialization (possible by wrapping getRandomWord in an arrow function)
        const [currentWord, setCurrentWord] = useState(() => getRandomWord())
        const [guessedLetters, setGuessedLetters] = useState([])
        
        // Derived values
        const numGuessesLeft = languages.length - 1
        const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
        const isGameWon = 
                currentWord.split("").every(letter => guessedLetters.includes(letter))
        console.log(isGameWon)
        const isGameLost = wrongGuessCount >= numGuessesLeft
        const isGameOver = isGameWon || isGameLost
        const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
        const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

        // Static values
        const alphabet = "qwertyuiopasdfghjklzxcvbnm"

        function addGuessedLetter(letter) {
                setGuessedLetters(prevLetters => {
                        return prevLetters.includes(letter) ?
                        prevLetters : [...prevLetters, letter]
                })
        }

        function startNewGame() {
                setCurrentWord(getRandomWord())
                setGuessedLetters([])
        }

        const languageElements = languages.map((lang, index) => {
                const isLanguageLost = index < wrongGuessCount
                const styles = {
                        backgroundColor: lang.backgroundColor,
                        color: lang.color
                }
                const className = clsx("chip", isLanguageLost && "lost")
                return (
                        <span 
                                className={className} 
                                style={styles}
                                key={lang.name}
                        >{lang.name}</span>
                )
        })

        const letterElements = currentWord.split("").map((letter, index) => {
                const shouldRevealLetter = isGameLost || guessedLetters.includes(letter)
                const letterClassName = clsx(
                        isGameLost && !guessedLetters.includes(letter) && "missed-letter"
                )
                return (
                        <span key={index} className={letterClassName}>
                                {shouldRevealLetter ? letter.toUpperCase() : ""}
                        </span>
                )
        })

        const keyboardElements = alphabet.split("").map(letter => {
                const isGuessed = guessedLetters.includes(letter)
                const isCorrect = isGuessed && currentWord.includes(letter)
                const isWrong = isGuessed && !currentWord.includes(letter)
                const className = clsx({
                        correct: isCorrect,
                        wrong: isWrong
                })
                return (
                        <button 
                                className={className}
                                key={letter} 
                                disabled={isGameOver}
                                aria-disabled={guessedLetters.includes(letter)}
                                aria-label={`Letter ${letter}`}
                                onClick={() => addGuessedLetter(letter)}
                        >{letter.toUpperCase()}</button>
                )
        })

        const gameStatusClass = clsx("game-status",  {
                won: isGameWon,
                lost: isGameLost,
                farewell: !isGameOver && isLastGuessIncorrect 
        })

        function renderGameStatus() {
                if (!isGameOver && isLastGuessIncorrect) {
                        return (
                                <p 
                                        className="farewell-message"
                                >{getFarwellText(languages[wrongGuessCount - 1].name)}</p>
                        )
                }
                if (isGameWon) {
                        return (
                                <>
                                        <h2>You win!</h2>
                                        <p>Well played! 🥳</p>
                                </>
                        )
                } 
                if (isGameLost) {
                        return (
                                <>
                                        <h2>You Lose!</h2>
                                        <p>I guess you'll have to learn C++ now 😭</p>
                                </>
                        )
                }
        }

        return (
                
                <main>
                        {
                                isGameWon && 
                                        <Confetti 
                                                recycle={false}
                                                numberOfPieces={500}
                                        />
                        }
                        <header>
                                <h1>Hangman</h1>
                                <p>Guess the word within 8 attempts to keep the programming languages alive!</p>
                        </header>
                        <section 
                                aria-live="polite" 
                                role="status" 
                                className={gameStatusClass}
                        >
                                {renderGameStatus()}
                        </section>
                        <section className='language-chips'>
                                {languageElements}
                        </section>
                        <section className="word">
                                {letterElements}
                        </section>
                        {/* Combined visually hidden aria-live region for status updates */}
                        <section 
                                className="sr-only"
                                aria-live="polite"
                                role="status" 
                        >       
                                <p>
                                        {
                                                currentWord.includes(lastGuessedLetter) ? 
                                                `Correct! The letter ${lastGuessedLetter} is in the word.` : 
                                                `Sorry, the letter ${lastGuessedLetter} is not in the word.`
                                        }
                                        You have {numGuessesLeft} attempts left.
                                </p>
                                <p>Current word: {currentWord.split().map(letter => 
                                        guessedLetters.includes(letter) ? 
                                        letter + "." : "blank."
                                        ).join(" ")}
                                </p>
                        </section>
                        <section className="keyboard">
                                {keyboardElements}
                        </section>
                        {isGameOver && 
                                <button 
                                        className="newGame-button" 
                                        onClick={startNewGame}
                                >New Game</button>
                        }
                </main>
        )
}
