import { injectable } from "inversify";
import fs from "fs";
import path from "path";
import { promisify } from "util";

const readFile = promisify(fs.readFile);

function normalizeFileName(fileName: string): string {
  return path.join(__dirname, "../../" + fileName);
}

async function parseFile(
  fileName: string,
  fullPath?: boolean
): Promise<string> {
  let nFileName = fileName;
  if (fullPath !== true) {
    nFileName = normalizeFileName(fileName);
  }
  if (fs.existsSync(nFileName)) {
    const fileContent = await readFile(nFileName);
    return fileContent.toString("utf-8");
  }
  return "";
}

export interface MDParserOptions {
  fullPath?: boolean;
}

@injectable()
export class MDFileParser {
  public async getMarkdownToEmbed(
    fileName: string,
    option?: MDParserOptions
  ): Promise<string> {
    return parseFile(fileName, option?.fullPath);
  }
}
