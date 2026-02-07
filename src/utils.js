export function getFarwellText(language) {
        const options = [
                `Farwell, ${language}`,
                `Adios, ${language}`,
                `R.I.P., ${language}`,
                `Oh no, not ${language}!`,
                `${language} bites the dust`,
                `Gone but not forgotten, ${language}`,
                `Off into the sunset, ${language}`,
                `${language} has left the chat`,
                `Pressing F to pay respect to ${language}`,
        ];

        const randomIndex = Math.floor(Math.random() * options.length);
        return options[randomIndex];
}