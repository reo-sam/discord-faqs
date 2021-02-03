import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { Bot } from "./bot";
import { Client } from "discord.js";
import { MessageResponder } from "./services/message-responder";
import { PingFinder } from "./services/ping-finder";
import { MDFileParser } from "./services/md-file-parser";
import { MDDirectoryParser } from "./services/md-dir-parser";

const container = new Container();

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client());
container
  .bind<string>(TYPES.Token)
  .toConstantValue(process.env.TOKEN as string);
container
  .bind<MessageResponder>(TYPES.MessageResponder)
  .to(MessageResponder)
  .inSingletonScope();
container.bind<PingFinder>(TYPES.PingFinder).to(PingFinder).inSingletonScope();
container
  .bind<MDFileParser>(TYPES.MDFileParser)
  .to(MDFileParser)
  .inSingletonScope();
container
  .bind<MDDirectoryParser>(TYPES.MDDirectoryParser)
  .to(MDDirectoryParser)
  .inSingletonScope();
export default container;
