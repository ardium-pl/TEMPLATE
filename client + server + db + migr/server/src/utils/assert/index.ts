import { Response } from 'express';
import { isDefined } from 'simple-bool';
import { _BaseAssert } from './_base-assert';
import { AssertNumber } from './number';
import { AssertString } from './string';

export class Assert extends _BaseAssert {
  exists() {
    if (this.isOk && !isDefined(this.value)) {
      this.res.status(400).json({ success: false, error: 'FIELD_REQUIRED', field: this.field });
      this.isOk = false;
    }
    return this;
  }
  isNumber() {
    if (this.isOk && typeof this.value != 'number') {
      this.res
        .status(400)
        .json({ success: false, error: 'TYPE_ERROR', field: this.field, got: typeof this.value, expected: 'number' });
      this.isOk = false;
    }
    return new AssertNumber(this.res, this.value, this.field, this.isOk);
  }
  isString() {
    if (this.isOk && typeof this.value != 'string') {
      this.res
        .status(400)
        .json({ success: false, error: 'TYPE_ERROR', field: this.field, got: typeof this.value, expected: 'string' });
      this.isOk = false;
    }
    return new AssertString(this.res, this.value, this.field, this.isOk);
  }
  isBoolean() {
    if (this.isOk && typeof this.value != 'boolean') {
      this.res
        .status(400)
        .json({ success: false, error: 'TYPE_ERROR', field: this.field, got: typeof this.value, expected: 'boolean' });
      this.isOk = false;
    }
    return this;
  }
  isObject() {
    if (this.isOk && (!isDefined(this.value) || typeof this.value != 'object')) {
      this.res
        .status(400)
        .json({ success: false, error: 'TYPE_ERROR', field: this.field, got: this.value, expected: 'object' });
      this.isOk = false;
    }
    return this;
  }
  isArray<T>(itemAssertFn: (res: Readonly<Response>, item: Readonly<T>, field: Readonly<string>) => boolean) {
    if (this.isOk) {
      if (!Array.isArray(this.value)) {
        this.res
          .status(400)
          .json({ success: false, error: 'TYPE_ERROR', field: this.field, got: this.value, expected: 'object' });
        this.isOk = false;
        return this;
      }
      for (let i = 0; i < this.value.length; i++) {
        const item = this.value[i];
        if (!itemAssertFn(this.res, item, `${this.field}[${i}]`)) {
          this.isOk = false;
          return this;
        }
      }
    }
    return this;
  }
}
