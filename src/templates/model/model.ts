import * as _ from "lodash";
import { Base } from "../base";

export class Model extends Base {
  private _dartString: string;

  constructor(fileName: string, suffix: string, private projectName?: string) {
    super(fileName, suffix);
    this._dartString = `import 'package:flutter/material.dart';

class ${this.className} extends ChangeNotifier {
  ${this.className}();

  ${this.className}.instance() {
    //Add here instance
  }
  
  void getter() {
    // Add code here for getter
    notifyListeners();
  }

  void setter() {
    // Add code here for setter
    notifyListeners();
  }

  void update() {
    // Add code here for update
    notifyListeners();
  }

  void remove() {
    // Add code here for remove
    notifyListeners();
  }
}`;
  }

  get dartString(): string {
    return this._dartString;
  }
}
