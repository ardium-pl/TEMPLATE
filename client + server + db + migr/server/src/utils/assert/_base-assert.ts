import { Response } from "express";

export class _BaseAssert {
  protected readonly value: any;
  constructor(protected readonly res: Response, protected readonly body: any, protected readonly field: string) {
    this.value = this.body?.[this.field];
  }

  public isOk: boolean = true;
  public get isFailed(): boolean {
    return !this.isOk;

  }
}
