import { Client, Message } from "discord.js";
import { inject, injectable } from "inversify";
import { inspect } from "util";
import { MessageResponder } from "./services/message-responder";
import { TYPES } from "./types";

@injectable()
export class Bot {
  private client: Client;
  private readonly token: string;
  private messageResponder: MessageResponder;

  constructor(
    @inject(TYPES.Client) client: Client,
    @inject(TYPES.Token) token: string,
    @inject(TYPES.MessageResponder) messageResponder: MessageResponder
  ) {
    this.client = client;
    this.token = token;
    this.messageResponder = messageResponder;
  }

  public listen(): Promise<string> {
    // event listener
    this.client.on("message", (message: Message) => {
      if (message.author.bot) {
        console.warn("Ignoring bot messages");
        return;
      }
      console.log("message received!");
      console.log(message.content);

      this.messageResponder
        .handleDir(message, "faqs")
        .then((messages) => {
          if (Array.isArray(messages)) {
            console.log(
              messages.map((innerMessageArray) => {
                return innerMessageArray.map(({ id, createdTimestamp }) => ({
                  id,
                  createdTimestamp,
                }));
              })
            );
          }
        })
        .catch((err) => {
          console.log("Could not send message");
          console.error(err);
        });
    });
    return this.client.login(this.token);
  }
}
