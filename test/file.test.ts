import { expect } from "chai";
import { getAllFiles, getAllDirs, getFileName, getFilePath } from "../src/index";
import "mocha";

describe("fs", function() {
  before(() => {});
  after(() => {});

  it("getAllFiles", async () => {
    let files = await getAllFiles("./test/path");
    expect(files.length).to.be.equal(5);
    expect(files[0]).to.be.equal("./test/path/.f2");
    expect(files[1]).to.be.equal("./test/path/f1.txt");
    expect(files[2]).to.be.equal("./test/path/path1/f3.txt");
    expect(files[3]).to.be.equal("./test/path/path1/path2/f4.txt");
    expect(files[4]).to.be.equal("./test/path/path12/f5.txt");
  });

  it("getAllDirs", async () => {
    let dirs = await getAllDirs("./test/path");
    expect(dirs.length).to.be.equal(3);
    expect(dirs[0]).to.be.equal("./test/path/path1");
    expect(dirs[1]).to.be.equal("./test/path/path1/path2");
    expect(dirs[2]).to.be.equal("./test/path/path12");
  });

  it("getFileName", async () => {
    let fileName = getFileName("c:/a/b/c.txt");
    expect(fileName).to.be.equal("c.txt");

    fileName = getFileName("c.txt");
    expect(fileName).to.be.equal("c.txt");

    fileName = getFileName("");
    expect(fileName).to.be.equal("");
  });

  it("getFilePath", async () => {
    let fileName = getFilePath("c:/a/b/c.txt");
    expect(fileName).to.be.equal("c:/a/b");

    fileName = getFilePath("c:/a/b/");
    expect(fileName).to.be.equal("c:/a/b");

    fileName = getFilePath("");
    expect(fileName).to.be.equal("");
  });
});
