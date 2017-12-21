import { expect } from "chai";
import { getAllFiles, getAllDirs } from "../src/index";
import "mocha";

describe("fs", function() {
  before(() => {});
  after(() => {});

  it("getAllFiles", async () => {
    let files = await getAllFiles("./test/path");
    expect(files.length).to.be.equal(3);
    expect(files[0]).to.be.equal('./test/path/.f2');
    expect(files[1]).to.be.equal('./test/path/f1.txt');
    expect(files[2]).to.be.equal('./test/path/path1/f3.txt');
  });

  it("getAllDirectories", async () => {
    let dirs = await getAllDirs("./test/path");
    expect(dirs.length).to.be.equal(3);
    expect(dirs[0]).to.be.equal('./test/path/path1');
    expect(dirs[1]).to.be.equal('./test/path/path1/path2');
    expect(dirs[2]).to.be.equal('./test/path/path12');
  });
});
