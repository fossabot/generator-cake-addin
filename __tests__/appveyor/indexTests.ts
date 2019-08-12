import * as fs from "fs";
import * as path from "path";
import * as assert from "yeoman-assert";
import * as helpers from "yeoman-test";

const baseDir = path.join(__dirname, "../../src/appveyor");

describe("generator:appveyor", () => {
  describe("defaults", () => {
    beforeEach(() => {
      return helpers.run(baseDir).withPrompts({
        enableLinux: false,
        indentYamlSize: 2,
        scriptName: "recipe.cake",
      });
    });

    it("creates appveyor build file", () => {
      assert.file([".appveyor.yml"]);
    });

    it("creates file with default content", () => {
      assert.equalsFileContent(
        ".appveyor.yml",
        fs.readFileSync(path.join(__dirname, "default.yml"), {
          encoding: "utf8",
        })
      );
    });
  });

  describe("custom space", () => {
    beforeEach(() => {
      return helpers.run(baseDir).withPrompts({
        enableLinux: false,
        indentYamlSize: 4,
        scriptName: "recipe.cake",
      });
    });

    it("creates appveyor build file", () => {
      assert.file([".appveyor.yml"]);
    });

    it("creates file with space indent set to 4", () => {
      assert.equalsFileContent(
        ".appveyor.yml",
        fs.readFileSync(path.join(__dirname, "custom_space.yml"), {
          encoding: "utf8",
        })
      );
    });
  });

  describe("custom-cake", () => {
    beforeEach(() => {
      return helpers.run(baseDir).withPrompts({
        enableLinux: false,
        indentYamlSize: 2,
        scriptName: "build.cake",
      });
    });

    it("creates appveyor build file", () => {
      assert.file([".appveyor.yml"]);
    });

    it("creates file with with custom cache", () => {
      assert.equalsFileContent(
        ".appveyor.yml",
        fs.readFileSync(path.join(__dirname, "custom_cake.yml"), {
          encoding: "utf8",
        })
      );
    });
  });

  describe("with-linux", () => {
    beforeEach(() => {
      return helpers.run(baseDir).withPrompts({
        enableLinux: true,
        indentYamlSize: 2,
        scriptName: "recipe.cake",
      });
    });

    it("creates appveyor build file", () => {
      assert.file([".appveyor.yml"]);
    });

    it("creates file with linux enabled", () => {
      assert.equalsFileContent(
        ".appveyor.yml",
        fs.readFileSync(path.join(__dirname, "linux_enabled.yml"), {
          encoding: "utf8",
        })
      );
    });
  });

  describe("with-linux-and-custom-cake", () => {
    beforeAll(() => {
      return helpers.run(baseDir).withPrompts({
        enableLinux: true,
        indentYamlSize: 2,
        scriptName: "build.cake",
      });
    });

    it("creates appveyor build file", () => {
      assert.file([".appveyor.yml"]);
    });

    it("creates file with linux enabled and custom cake cache", () => {
      assert.equalsFileContent(
        ".appveyor.yml",
        fs.readFileSync(path.join(__dirname, "linux_enabled_cake_custom.yml"), {
          encoding: "utf8",
        })
      );
    });
  });
});
