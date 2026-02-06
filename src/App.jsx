import { useState } from "react"
import { languages } from "./languages"

export default function Hangman() {

        const languageElements = languages.map(lang => {
                const styles = {
                        backgroundColor: lang.backgroundColor,
                        color: lang.color
                }
                return (
                        <span 
                                className="chip" 
                                style={styles}
                                ke7={lang.name}
                        >{lang.name}</span>
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
                </main>
        )
}