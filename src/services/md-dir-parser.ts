import { injectable } from "inversify";
import fs from "fs";
import path from "path";
import { promisify } from "util";

const MD_FILE_EXTENSION = ".md";
const readDir = promisify(fs.readdir);
const fsStat = promisify(fs.stat);

function normalizeDirName(dirName: string): string {
  return path.join(__dirname, "../../" + dirName);
}

async function listMarkdownFiles(dirName: string): Promise<string[]> {
  const actualDirPath = normalizeDirName(dirName);
  if (fs.existsSync(actualDirPath)) {
    const listOfFiles = await readDir(actualDirPath);
    return listOfFiles
      .map((file) => path.join(actualDirPath, file))
      .filter(
        async (file) =>
          path.extname(file) === MD_FILE_EXTENSION &&
          (await fsStat(file)).isFile
      );
  }
  return [];
}

@injectable()
export class MDDirectoryParser {
  public async getMDFiles(dirName: string): Promise<string[]> {
    return listMarkdownFiles(dirName);
  }
}
