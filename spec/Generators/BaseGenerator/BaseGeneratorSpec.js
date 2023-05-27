import BaseGenerator from "../../../src/Generators/BaseGenerator";

describe("BaseGenerator", function () {
  it("should be able to create a new instance", function () {
    const baseGenerator = new BaseGenerator();
    expect(baseGenerator).toBeTruthy();
  });
});
