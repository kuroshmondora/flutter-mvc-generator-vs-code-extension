import * as _ from "lodash";
import { Base } from "../base";

export class View extends Base {
  private _dartString: string;

  constructor(fileName: string, suffix: string, private projectName?: string) {
    super(fileName, suffix);

    let classPrefixList: string[] = this.className.split("View");
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
// import controller
import '${initialPath}controllers/${fileName}/${fileName}_controller.dart';

class ${this.className} extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    ${classPrefix}Controller viewController = ${classPrefix}Controller();
    return ChangeNotifierProvider<${classPrefix}Model>(
      create: (context) => ${classPrefix}Model.instance(),
      child: Consumer<${classPrefix}Model>(
        builder: (context, viewModel, child) {
          return Container(
              //TODO Add layout or component here
              );
        },
      ),
    );
  }
}`;
  }

  get dartString(): string {
    return this._dartString;
  }
}
