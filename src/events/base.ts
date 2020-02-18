import * as path from "path";
import { existsSync } from "fs";

export class BaseFile {
  constructor(
    private rootPath: string,
    private snakeCasedFileName: string,
    private folders?: string[]
  ) {}

  public get pathComponents(): string {
    return path.join(this.rootPath, "lib", "components");
  }

  public get pathViewComponents(): string {
    if (this.folders === undefined) {
      return path.join(
        this.rootPath,
        "lib",
        "views",
        this.snakeCasedFileName,
        "components"
      );
    }
    return path.join(
      this.rootPath,
      "lib",
      "views",
      ...this.folders,
      this.snakeCasedFileName,
      "components"
    );
  }

  public get pathViewLayouts(): string {
    if (this.folders === undefined) {
      return path.join(
        this.rootPath,
        "lib",
        "views",
        this.snakeCasedFileName,
        "layouts"
      );
    }
    return path.join(
      this.rootPath,
      "lib",
      "views",
      ...this.folders,
      this.snakeCasedFileName,
      "layouts"
    );
  }
}
