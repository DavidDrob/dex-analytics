# dex-analytics

My Submission for the Gitcoin DeFi & Cross-Chain Interoperability Hackathon.

# Setup

1. git clone https://github.com/DavidDrob/dex-analytics.git
2. cd dex-analytics
3. npm install
4. Get an API Key at https://www.covalenthq.com/platform/#/auth/register
5. Go to ```src/App.vue```
6. Change the API Key at line 69

```
    return {
      chainId: 1,
      API_KEY: "Your API Key",
    };
```

7. npm run dev
