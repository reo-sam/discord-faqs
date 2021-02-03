import { Message } from "discord.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { MDDirectoryParser } from "./md-dir-parser";
import { MDFileParser } from "./md-file-parser";
import { PingFinder } from "./ping-finder";

@injectable()
export class MessageResponder {
  private pingFinder: PingFinder;
  private mdReader: MDFileParser;
  private mdDirParser: MDDirectoryParser;

  constructor(
    @inject(TYPES.PingFinder) pingFinder: PingFinder,
    @inject(TYPES.MDFileParser) mdFileParser: MDFileParser,
    @inject(TYPES.MDDirectoryParser) mdDirectoryParser: MDDirectoryParser
  ) {
    this.pingFinder = pingFinder;
    this.mdReader = mdFileParser;
    this.mdDirParser = mdDirectoryParser;
  }

  async handleDir(message: Message, dirName: string) {
    if (this.pingFinder.isPing(message.content)) {
      const mdFiles = await this.mdDirParser.getMDFiles(dirName);
      return Promise.all(
        mdFiles.map(async (mdFile) =>
          message.channel.send(
            await this.mdReader.getMarkdownToEmbed(mdFile, { fullPath: true }),
            {
              split: true,
            }
          )
        )
      );
    }
  }

  async handle(message: Message): Promise<Message | Message[]> {
    if (this.pingFinder.isPing(message.content)) {
      // const mdValue = await this.mdReader.getMarkdownToEmbed("lipsum.md");
      const mdValue = await this.mdReader.getMarkdownToEmbed("lipsum.md");
      return message.channel.send(mdValue, { split: true });
    }
    return Promise.reject();
  }
}
