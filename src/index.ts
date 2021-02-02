// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

import container from "./inversify.config";
import { TYPES } from "./types";
import { Bot } from "./bot";

const bot = container.get<Bot>(TYPES.Bot);
bot
  .listen()
  .then((x) => {
    console.log("logged in!");
  })
  .catch((err) => {
    console.error("Oh no!", err);
  });
