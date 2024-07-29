# JEFFWORLD SIMPLE QUIZ

This is a simple multi-question quiz. When the quiz is finished, it can send an analytics value to Vatom Studio.

## Quiz Content

To customize your quiz, use the format below. There is no limit on the number of questions, however you must use **three** answer options per question.

When choosing the correct answer, start from value 0 for the first answer. In the example below, "Non-Fungible Token" is the correct answer, and the "correct" value is 0. If the second answer is correct, use value of 1.


```json
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
```

## Analytics Value

To send a trigger to Vatom Studio custom event, provide an event value for your quiz. The studio configuration will define the "value" or number of correct answers required.

## Limit Re-Takes

You can prevent users from re-taking the quiz either after completing it with any score, or only after getting all answers correct. Use the "Limit Replay After" setting to 'Any Finish' or 'All Correct' and then set an Analytics Name. The Analytics Name will hold the state of whether the user has taken the quiz or not. If you change the analytics name, users can take the quiz again.

## Single Question Quiz

The 'Quiz - Single Question' component allows you to have a single question quiz. This can be a single set question, or it can be randomized from a set of questions.



# Vatom Template Plugin 🔌

This plugin is designed to be used from within [Vatom Spaces](https://vatom.com).

## Development

- Ensure you have [Node](https://nodejs.org) installed
- Install dependencies with `npm install`
- Login to the Vatom CLI with `npm run login`
- Build and load the plugin into your space with `npm run sideload @myspace` (replace `myspace` with your space alias name)
- When ready, publish to the Marketplace with `npm run publish`

> **Note:** You can only sideload plugins in a space you are the owner of.
