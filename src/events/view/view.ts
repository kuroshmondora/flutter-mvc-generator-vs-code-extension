import * as path from "path";
import * as _ from "lodash";
import { existsSync } from "fs";
import { FileSystemManager } from "../../utils/file_system_manager";
import { View } from "../../templates/view/view";
import { YamlHelper } from "../../utils/yaml_helper";
import { BaseFile } from "../base";
export class ViewFile {
  constructor(
    private rootPath: string,
    private fileName: string,
    private folders?: string[]
  ) {
    console.debug(`ViewFile(rootPath: ${rootPath}, fileName: ${fileName})`);
    let baseFile = new BaseFile(
      this.rootPath,
      this.snakeCasedFileName,
      this.folders
    );
    let componentsFolderCreated = FileSystemManager.createFolder(
      baseFile.pathComponents
    );
    if (!componentsFolderCreated) {
      return;
    }
    let folderCreated = FileSystemManager.createFolder(this.pathValue);
    if (!folderCreated) {
      return;
    }
    let viewComponentsFolderCreated = FileSystemManager.createFolder(
      baseFile.pathViewComponents
    );
    if (!viewComponentsFolderCreated) {
      return;
    }
    let viewLayoutsFolderCreated = FileSystemManager.createFolder(
      baseFile.pathViewLayouts
    );
    if (!viewLayoutsFolderCreated) {
      return;
    }
  }

  public createResponsiveViews() {
    this.createFiles(
      this.snakeCasedFileName + "_view.dart",
      new View(this.snakeCasedFileName, "View", YamlHelper.getProjectName())
        .dartString
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
      return path.join(this.rootPath, "lib", "views", this.snakeCasedFileName);
    }
    return path.join(
      this.rootPath,
      "lib",
      "views",
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
