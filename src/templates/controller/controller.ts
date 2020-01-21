import * as _ from "lodash";
import { Base } from "../base";

export class Controller extends Base {
  private _dartString: string;

  constructor(fileName: string, suffix: string, private projectName?: string) {
    super(fileName, suffix);
    let classPrefixList: string[] = this.className.split("Controller");
    let classPrefix: string | undefined;
    if (!_.isEmpty(classPrefixList)) {
      classPrefix = _.first(classPrefixList);
    }
    let initialPath =
      this.projectName === undefined
        ? "../../"
        : `package:${this.projectName}/`;
    this._dartString = `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
// import model
import '${initialPath}models/${fileName}/${fileName}_model.dart';

class ${this.className} {
  ${this.className}();
  
  void getter(BuildContext context) {
    ${classPrefix}Model viewModel = Provider.of<${classPrefix}Model>(context, listen: false);
    // Add code here for getter
    viewModel.getter();
  }

  void setter(BuildContext context) {
    ${classPrefix}Model viewModel = Provider.of<${classPrefix}Model>(context, listen: false);
    // Add code here for setter
    viewModel.setter();
  }

  void update(BuildContext context) {
    ${classPrefix}Model viewModel = Provider.of<${classPrefix}Model>(context, listen: false);
    // Add code here for update
    viewModel.update();
  }

  void remove(BuildContext context) {
    ${classPrefix}Model viewModel = Provider.of<${classPrefix}Model>(context, listen: false);
    // Add code here for remove
    viewModel.remove();
  }
}`;
  }

  get dartString(): string {
    return this._dartString;
  }
}
