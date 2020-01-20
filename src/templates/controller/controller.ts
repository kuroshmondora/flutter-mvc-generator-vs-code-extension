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
    this._dartString = `// import model
import '${initialPath}models/${fileName}/${fileName}_model.dart';

class ${this.className} {
  ${classPrefix}Model _viewModel = ${classPrefix}Model();
  ${this.className}();
  
  void getter() {
    // Add code here for getter
    _viewModel.getter();
  }

  void setter() {
    // Add code here for setter
    _viewModel.setter();
  }

  void update() {
    // Add code here for update
    _viewModel.update();
  }

  void remove() {
    // Add code here for remove
    _viewModel.remove();
  }
}`;
  }

  get dartString(): string {
    return this._dartString;
  }
}
