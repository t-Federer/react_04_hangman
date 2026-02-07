import { useState } from "react"
import { languages } from "./languages"
import { clsx } from "clsx"

export default function Hangman() {
        // State values
        const [currentWord, setCurrentWord] = useState("react")
        const [guessedLetters, setGuessedLetters] = useState([])
        
        // Derived values
        const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
        const isGameWon = 
                currentWord.split("").every(letter => guessedLetters.includes(letter))
        console.log(isGameWon)
        const isGameLost = wrongGuessCount >= languages.length - 1
        const isGameOver = isGameWon || isGameLost

        // Static values
        const alphabet = "qwertyuiopasdfghjklzxcvbnm"

        function addGuessedLetter(letter) {
                setGuessedLetters(prevLetters => {
                        return prevLetters.includes(letter) ?
                        prevLetters : [...prevLetters, letter]
                })
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

        const letterElements = currentWord.split("").map((letter, index) => (
                <span key={index}>
                        {guessedLetters.includes(letter) ? letter.toUpperCase() : ""}
                </span>
        ))

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
                                onClick={() => addGuessedLetter(letter)}
                        >{letter.toUpperCase()}</button>
                )
        })

        const gameStatusClass = clsx("game-status",  {
                won: isGameWon,
                lost: isGameLost
        })

        function renderGameStatus() {
                if (!isGameOver) {
                        return null
                }
                if (isGameWon) {
                        return (
                                <>
                                        <h2>You win!</h2>
                                        <p>Well played! 🥳</p>
                                </>
                        )
                } else {
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
                        <header>
                                <h1>Hangman</h1>
                                <p>Guess the word within 8 attempts to keep the programming languages alive!</p>
                        </header>
                        <section className={gameStatusClass}>
                                {renderGameStatus()}
                        </section>
                        <section className='language-chips'>
                                {languageElements}
                        </section>
                        <section className="word">
                                {letterElements}
                        </section>
                        <section className="keyboard">
                                {keyboardElements}
                        </section>
                        {isGameOver && <button className="newGame-button">New Game</button>}
                </main>
        )
}