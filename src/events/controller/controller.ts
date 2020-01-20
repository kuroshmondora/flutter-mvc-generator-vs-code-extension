import * as path from "path";
import * as _ from "lodash";
import { existsSync } from "fs";
import { FileSystemManager } from "../../utils/file_system_manager";
import { Controller } from "../../templates/controller/controller";
import { YamlHelper } from "../../utils/yaml_helper";

export class ControllerFile {
  constructor(
    private rootPath: string,
    private fileName: string,
    private folders?: string[]
  ) {
    console.debug(`ViewFile(rootPath: ${rootPath}, fileName: ${fileName})`);
    let folderCreated = FileSystemManager.createFolder(this.pathValue);
    if (!folderCreated) {
      return;
    }
  }

  public createResponsiveViews() {
    this.createFiles(
      this.snakeCasedFileName + "_controller.dart",
      new Controller(
        this.snakeCasedFileName,
        "Controller",
        YamlHelper.getProjectName()
      ).dartString
    );
    YamlHelper.initializeWithDependencies();
  }

  private get snakeCasedFileName(): string {
    let snakeCasedFileName = _.snakeCase(this.fileName);
    console.debug(`get snakeCasedFileName: ${snakeCasedFileName}`);
    return snakeCasedFileName;
  }

  private get pathValue(): string {
    if (this.folders === undefined) {
      return path.join(
        this.rootPath,
        "lib",
        "controllers",
        this.snakeCasedFileName
      );
    }
    return path.join(
      this.rootPath,
      "lib",
      "controllers",
      ...this.folders,
      this.snakeCasedFileName
    );
  }

  private createFiles(fileName: string, data: string) {
    if (existsSync(path.join(this.pathValue, this.snakeCasedFileName))) {
      console.warn(`${fileName} already exists`);
      return;
    }

    FileSystemManager.createFile(this.pathValue, fileName, data);
  }
}
