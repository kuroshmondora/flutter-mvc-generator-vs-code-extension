import * as _ from "lodash";
import { Base } from "../base";

export class Model extends Base {
  private _dartString: string;

  constructor(fileName: string, suffix: string, private projectName?: string) {
    super(fileName, suffix);
    this._dartString = `import 'package:flutter/material.dart';

enum ${this.className}Status {
  Ended,
  Loading,
}

class ${this.className} extends ChangeNotifier {
  ${this.className}Status _status;
  ${this.className}Status get status => _status;

  ${this.className}();

  ${this.className}.instance() {
    //TODO Add code here
  }
  
  void getter() {
    _status = ${this.className}Status.Loading;
    notifyListeners();

    //TODO Add code here

    _status = ${this.className}Status.Ended;
    notifyListeners();
  }

  void setter() {
     _status = ${this.className}Status.Loading;
    notifyListeners();

    //TODO Add code here
    
    _status = ${this.className}Status.Ended;
    notifyListeners();
  }

  void update() {
    _status = ${this.className}Status.Loading;
    notifyListeners();

    //TODO Add code here
    
    _status = ${this.className}Status.Ended;
    notifyListeners();
  }

  void remove() {
    _status = ${this.className}Status.Loading;
    notifyListeners();

    //TODO Add code here
    
    _status = ${this.className}Status.Ended;
    notifyListeners();
  }
}`;
  }

  get dartString(): string {
    return this._dartString;
  }
}
