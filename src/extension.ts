import * as vscode from "vscode";
import _ = require("lodash");
import { FileSystemManager } from "./utils/file_system_manager";
import { VsCodeActions } from "./utils/vs_cose_actions";
import { Utils } from "./utils/utils";
import { ViewFile } from "./events/view/view";
import { ModelFile } from "./events/model/model";
import { ControllerFile } from "./events/controller/controller";

export function activate(context: vscode.ExtensionContext) {
  let mvcDisposable = vscode.commands.registerCommand(
    "extension.createMVC",
    async () => {
      let inputString = await checkInputString();
      if (inputString === undefined) {
        VsCodeActions.showErrorMessage("Invalid name for file");
        return;
      }
      let folders: string[] = [];
      folders = getFolders(inputString);
      let fileName = getFileName(inputString);
      if (fileName === undefined) {
        VsCodeActions.showErrorMessage("Invalid name for file");
        return;
      }
      let rootPath = VsCodeActions.rootPath;
      if (rootPath === undefined) {
        return;
      }
      new ModelFile(rootPath, fileName, folders).createResponsiveViews();
      new ViewFile(rootPath, fileName, folders).createResponsiveViews();
      new ControllerFile(rootPath, fileName, folders).createResponsiveViews();
    }
  );

  let modelDisposable = vscode.commands.registerCommand(
    "extension.createModel",
    async () => {
      let inputString = await checkInputString();
      if (inputString === undefined) {
        VsCodeActions.showErrorMessage("Invalid name for file");
        return;
      }
      let folders: string[] = [];
      folders = getFolders(inputString);
      let fileName = getFileName(inputString);
      if (fileName === undefined) {
        VsCodeActions.showErrorMessage("Invalid name for file");
        return;
      }
      let rootPath = VsCodeActions.rootPath;
      if (rootPath === undefined) {
        return;
      }
      new ModelFile(rootPath, fileName, folders).createResponsiveViews();
    }
  );

  let viewDisposable = vscode.commands.registerCommand(
    "extension.createView",
    async () => {
      let inputString = await checkInputString();
      if (inputString === undefined) {
        VsCodeActions.showErrorMessage("Invalid name for file");
        return;
      }
      let folders: string[] = [];
      folders = getFolders(inputString);
      let fileName = getFileName(inputString);
      if (fileName === undefined) {
        VsCodeActions.showErrorMessage("Invalid name for file");
        return;
      }
      let rootPath = VsCodeActions.rootPath;
      if (rootPath === undefined) {
        return;
      }
      new ViewFile(rootPath, fileName, folders).createResponsiveViews();
    }
  );

  let controllerDisposable = vscode.commands.registerCommand(
    "extension.createController",
    async () => {
      let inputString = await checkInputString();
      if (inputString === undefined) {
        VsCodeActions.showErrorMessage("Invalid name for file");
        return;
      }
      let folders: string[] = [];
      folders = getFolders(inputString);
      let fileName = getFileName(inputString);
      if (fileName === undefined) {
        VsCodeActions.showErrorMessage("Invalid name for file");
        return;
      }
      let rootPath = VsCodeActions.rootPath;
      if (rootPath === undefined) {
        return;
      }
      new ControllerFile(rootPath, fileName, folders).createResponsiveViews();
    }
  );

  context.subscriptions.push(mvcDisposable);
  context.subscriptions.push(modelDisposable);
  context.subscriptions.push(viewDisposable);
  context.subscriptions.push(controllerDisposable);

  let checkInputString = async () => {
    if (!FileSystemManager.isFlutterProject()) {
      return;
    }
    let inputString = await VsCodeActions.getInputString(
      "Enter class name",
      async value => {
        if (value.length === 0) {
          return "Enter class name";
        }
        if (value.toLowerCase() === "view") {
          return "View is not a valid class name";
        }
        return undefined;
      }
    );
    if (inputString.length === 0 || inputString.toLowerCase() === "view") {
      console.warn("activate: inputString length is 0");
      return;
    }
    console.debug(`fileName: { ${inputString} }`);
    return inputString;
  };

  let getFolders = (inputString: String) => {
    let nameArray = inputString.trim().split("/");
    let folders: string[] = [];
    if (nameArray.length > 1) {
      let folderList = nameArray
        .splice(0, nameArray.length - 1)
        .map(element => {
          return element;
        });
      console.debug(`folderlist: { ${folderList} }`);
      folders = folderList;
    }
    console.debug(`folders: { ${folders} }`);
    return folders;
  };

  let getFileName = (inputString: String) => {
    let nameArray = inputString.trim().split("/");
    let formattedInputString = _.last(nameArray);
    if (formattedInputString === undefined) {
      console.error("formattedInputString is undefined");
      return;
    }
    let fileName = Utils.processFileName(formattedInputString);
    console.debug(`activate: fileName: ${fileName}`);
    return fileName;
  };
}

export function deactivate() {}
