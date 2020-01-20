import * as path from "path";
import * as _ from "lodash";
import { existsSync } from "fs";
import { FileSystemManager } from "../../utils/file_system_manager";
import { Model } from "../../templates/model/model";
import { YamlHelper } from "../../utils/yaml_helper";

export class ModelFile {
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
      this.snakeCasedFileName + "_model.dart",
      new Model(this.snakeCasedFileName, "Model", YamlHelper.getProjectName())
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
      return path.join(this.rootPath, "lib", "models", this.snakeCasedFileName);
    }
    return path.join(
      this.rootPath,
      "lib",
      "models",
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
