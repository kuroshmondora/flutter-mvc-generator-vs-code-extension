import * as _ from "lodash";

export abstract class Base {
  constructor(
    private fileName: string,
    private classSuffix?: string,
    private pattern?: string
  ) {}

  get className(): string {
    return this.getClassName(this.fileName, this.classSuffix, this.pattern);
  }

  private getClassName(
    fileName: string,
    suffix?: string,
    pattern?: string
  ): string {
    let camelCaseString = _.camelCase(fileName);
    let className = this.convertStringToUpperCamelCase(camelCaseString);
    if (suffix === undefined) {
      return className;
    }
    return (className += suffix);
  }

  private convertStringToUpperCamelCase(fileName: string): string {
    let camelCaseString = _.camelCase(fileName);
    return _.upperFirst(camelCaseString);
  }
}
