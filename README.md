# 4casters-socket-examples

Example code to connect to the 4casters Streaming API Feeds.

## Setup

1. **Prerequisites**:
   - Ensure you have `nodejs` and `npm` installed on your machine.

2. **Installation**:
   - Clone or download the repository.
   - Navigate to the `4casters-socket-examples` directory.
   - Install the required dependencies:
     ```console
     foo@bar:~$ cd 4casters-socket-examples
     4casters-socket-examples:~$ npm install
     ```

3. **Configuration**:
   - Replace the constants `username` and `password` in both `./index.priceFeeds.js` and `./index.userFeeds.js` with your valid 4casters credentials.
   - Note: These constants are found in lines 7 and 8 of both files.

## Running the examples

- **For Price Feeds**:
  ```console
  4casters-socket-examples:~$ npm run priceFeeds

- **For User Feeds**:
  ```console
  4casters-socket-examples:~$ npm run userFeeds
