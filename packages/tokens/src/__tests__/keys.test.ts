import { existsSync } from "fs";
import path from "path";
import { describe, it, expect } from "@jest/globals";

describe('generateKeys', () => {
  it('should generate keys successfully', () => {
    expect(existsSync(path.join(__dirname, '../keys/private.key'))).toBeTruthy();
    expect(existsSync(path.join(__dirname, '../keys/public.pub'))).toBeTruthy();
  });
});
