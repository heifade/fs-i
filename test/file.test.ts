import { expect } from "chai";
import { getAllFiles, getFileName, getFiles, readFileUtf8 } from "../src/index";
import "mocha";

describe("fs", function() {
  before(() => {});
  after(() => {});

  it("getAllFiles", async () => {
    let files = await getAllFiles("./test/path");
    expect(files.length).to.be.equal(5);
    expect(files[0]).to.be.equal("./test/path/file1.txt");
    expect(files[1]).to.be.equal("./test/path/file2.txt");
    expect(files[2]).to.be.equal("./test/path/path1/file11.txt");
    expect(files[3]).to.be.equal("./test/path/path1/path11/file111.txt");
    expect(files[4]).to.be.equal("./test/path/path2/file21.txt");
  });

  it("getFiles", async () => {
    let files = await getFiles("./test/path");
    expect(files.length).to.be.equal(2);
    expect(files[0]).to.be.equal("./test/path/file1.txt");
    expect(files[1]).to.be.equal("./test/path/file2.txt");
  });

  it("getFileName", async () => {
    let fileName = getFileName("c:/a/b/c.txt");
    expect(fileName).to.be.equal("c.txt");

    fileName = getFileName("c.txt");
    expect(fileName).to.be.equal("c.txt");

    fileName = getFileName("");
    expect(fileName).to.be.equal("");
  });

  it("readFileUtf8", async () => {
    expect(await readFileUtf8("./test/path/file1.txt")).to.be.equal("1");
  });
});
