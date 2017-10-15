# Emo Clash
A mobile app to measure your expression using Microsoft Cognitive API.

## Developement
To setup:
``` bash
yarn
```

Create `config/env.json` with following format:
``` javascript
{
  "MicrosoftEmotion": "Your API key",
  "FirebaseConfig": {
    // firebase config object for web, include "apiKey", "authDomain", ...
    // require anonymous authentication enabled
  }
}
```

Get your free API key for [Firebase](https://firebase.google.com/) and [Microsoft Emotion API](https://azure.microsoft.com/en-us/try/cognitive-services/#vision).
