import { useState } from "react"
import { languages } from "./languages"
import { clsx } from "clsx"

export default function Hangman() {
        const [currentWord, setCurrentWord] = useState("react")
        const [guessedLetters, setGuessedLetters] = useState([])

        const alphabet = "qwertyuiopasdfghjklzxcvbnm"

        function addGuessedLetter(letter) {
                setGuessedLetters(prevLetters => {
                        return prevLetters.includes(letter) ?
                        prevLetters : [...prevLetters, letter]
                })
        }

        const languageElements = languages.map(lang => {
                const styles = {
                        backgroundColor: lang.backgroundColor,
                        color: lang.color
                }
                return (
                        <span 
                                className="chip" 
                                style={styles}
                                key={lang.name}
                        >{lang.name}</span>
                )
        })

        const letterElements = currentWord.split("").map((letter, index) => (
                <span key={index}>{letter.toUpperCase()}</span>
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

        return (
                <main>
                        <header>
                                <h1>Hangman</h1>
                                <p>Guess the word within 8 attempts to keep the programming languages alive!</p>
                        </header>
                        <section className='game-status'>
                                <h2>You win!</h2>
                                <p>Well played! 🥳</p>
                        </section>
                        <section className='language-chips'>
                                {languageElements}
                        </section>
                        <section className="word">
                                {letterElements}
                        </section>
                        <section className="keyboard">
                                {keyboardElements}
                                <button id="newGame-button">New Game</button>
                        </section>
                        
                </main>
        )
}