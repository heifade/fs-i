import { expect } from "chai";
import { getAllFiles, getAllFilesSync, getFileName, getFiles, getFilesSync, readFileUtf8, readFileUtf8Sync, saveFileUtf8Sync, saveFileUtf8, renameSync, deleteFileSync, deleteFile, existsSync } from "../src/index";
import "mocha";

describe("file", function() {
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

  it("getAllFilesSync", async () => {
    let files = getAllFilesSync("./test/path");
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

  it("getFilesSync", async () => {
    let files = getFilesSync("./test/path");
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

  it("readFileUtf8Sync", async () => {
    expect(readFileUtf8Sync("./test/path/file1.txt")).to.be.equal("1");
  });

  it("saveFileUtf8Sync", async () => {
    let file = `./test/path/${Math.random()}.txt`;
    saveFileUtf8Sync(file, "111");
    expect(existsSync(file)).to.be.true;
    expect(readFileUtf8Sync(file)).to.be.equal("111");
    deleteFileSync(file);
    deleteFileSync(file);
    expect(existsSync(file)).to.be.false;
  });

  it("saveFileUtf8", async () => {
    let file = `./test/path/${Math.random()}.txt`;
    await saveFileUtf8(file, "111");
    expect(existsSync(file)).to.be.true;
    expect(readFileUtf8Sync(file)).to.be.equal("111");
    await deleteFile(file);
    expect(existsSync(file)).to.be.false;
  });

  it("renameSync", async () => {
    let file1 = `./test/path/${Math.random()}.txt`;
    let file2 = `./test/path/${Math.random()}.txt`;

    expect(existsSync(file1)).to.be.false;
    expect(existsSync(file2)).to.be.false;

    await saveFileUtf8(file1, "111");
    expect(existsSync(file1)).to.be.true;
    expect(existsSync(file2)).to.be.false;

    renameSync(file1, file2);

    expect(existsSync(file1)).to.be.false;
    expect(existsSync(file2)).to.be.true;

    deleteFileSync(file2);

    expect(existsSync(file1)).to.be.false;
    expect(existsSync(file2)).to.be.false;
  });
});
