import * as bcrypt from 'bcrypt';

export class HashManager {
  static async hash(value: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashedValue = await bcrypt.hash(value, salt);

    return hashedValue;
  }

  static async compare(
    valueToCompare: string,
    hashedValue: string,
  ): Promise<boolean> {
    const isMatchedValues = await bcrypt.compare(valueToCompare, hashedValue);

    return isMatchedValues;
  }
}
