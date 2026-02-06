import { useState } from 'react'

export default function Hangman() {
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
                </main>
        )
}