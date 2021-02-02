import { injectable } from "inversify";

@injectable()
export class PingFinder {
  private regExp = "!ping";

  public isPing(stringToSearch: string): boolean {
    return stringToSearch.search(this.regExp) >= 0;
  }
}
