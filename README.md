# JEFFWORLD SIMPLE QUIZ

This is a simple multi-question quiz. When the quiz is finished, it can send an analytics value to Vatom Studio.

# Quiz Content

To customize your quiz, use the format below. There is no limit on the number of questions.

When choosing the correct answer, start from value 0 for the first answer. In the example below, "Non-Fungible Token" is the correct answer, and the "correct" value is 0. If the second answer is correct, use value of 1.

[
    {
        "question": "What does NFT stand for?",
        "choices": ["Non-Fungible Token", "New Financial Technology", "National Finance Treaty"],
        "correct": 0
    },
    {
        "question": "Which blockchain network is commonly used for NFTs?",
        "choices": ["Ethereum", "Bitcoin", "Cardano"],
        "correct": 0
    },
    {
        "question": "What is the primary function of an NFT?",
        "choices": ["Storing cryptocurrencies", "Representing ownership or proof of authenticity", "Decentralized voting"],
        "correct": 1
    },
    {
        "question": "What does DAO stand for in the context of Metaverse technology?",
        "choices": ["Digital Asset Operations", "Decentralized Autonomous Organization", "Dynamic Augmented Objects"],
        "correct": 1
    },
    {
        "question": "Which concept is central to the Metaverse?",
        "choices": ["Physical reality", "Virtual economies and identities", "Global weather patterns"],
        "correct": 1
    }
]


# Vatom Template Plugin 🔌

This plugin is designed to be used from within [Vatom Spaces](https://vatom.com).

## Development

- Ensure you have [Node](https://nodejs.org) installed
- Install dependencies with `npm install`
- Login to the Vatom CLI with `npm run login`
- Build and load the plugin into your space with `npm run sideload -- myspace` (replace `myspace` with your space alias name)
- When ready, publish to the Marketplace with `npm run publish`

> **Note:** You can only sideload plugins in a space you are the owner of.
