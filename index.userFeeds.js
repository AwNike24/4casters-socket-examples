// Base urls for 4caster services
const FOURCASTER_API_URL = "https://api.4casters.io";
const FOURCASTER_WS_URL = "wss://socket-api.4casters.io";

// Valid 4caster account
const username = "";
const password = "";

// import dependencies
const axios = require("axios");
const { Manager } = require("socket.io-client");

// utility function for calling a rest api
async function callRestApi({ url, method = "GET", data, headers, params }) {
  const response = await axios({ url, method, data, headers, params });
  return response.data.data;
}

// wrapper to login to the 4caster REST API
// a valid auth token is needed to connect to the streaming API
async function logIn({ username, password }) {
  return callRestApi({
    url: FOURCASTER_API_URL + "/user/login",
    method: "POST",
    data: {
      username,
      password,
    },
  });
}

logIn({ username, password }).then((response) => {
  const { user } = response;
  const { auth } = user;

  // initialize socket.io client manager
  const manager = new Manager(FOURCASTER_WS_URL, {
    reconnectionDelayMax: 1000,
    query: { token: auth },
  });

  // initialize a socket connection to the priceUpdate feed
  const socket = manager.socket("/v2/user/" + username, {
    query: { token: auth },
  });

  // log connection event
  socket.on("connect", () => {
    console.log(`*** ${username} connected to User Feeds ***`);
  });

  // Listen for positionUpdate events from the server
  // These position update messages are emitted:
  // - every time you create an order
  // - every time you cancel an order
  // - any time one of your orders is filled
  // - every time you fill someone else's order
  socket.on("positionUpdate", (positionUpdate) => {
    const parsedGameUpdate = JSON.parse(positionUpdate);
    // Log the parsed position update message
    console.log(positionUpdate);
  });
});
