import { expect } from "chai";
import { getAllDirs, getFilePath, getDirs } from "../src/index";
import "mocha";

describe("fs", function() {
  before(() => {});
  after(() => {});

  

  it("getAllDirs", async () => {
    let dirs = await getAllDirs("./test/path");
    expect(dirs.length).to.be.equal(3);
    expect(dirs[0]).to.be.equal("./test/path/path1");
    expect(dirs[1]).to.be.equal("./test/path/path1/path11");
    expect(dirs[2]).to.be.equal("./test/path/path2");
  });

  
  it("getDirs", async () => {
    let files = await getDirs("./test/path");
    expect(files.length).to.be.equal(2);
    expect(files[0]).to.be.equal("./test/path/path1");
    expect(files[1]).to.be.equal("./test/path/path2");
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
