import { expect } from "chai";
import { getAllDirs, getAllDirsSync, getFilePath, getDirs, getDirsSync, exists, existsSync, mkdirs, mkdirsSync, rmdir, rmdirSync } from "../src/index";
import "mocha";

describe("fs", function() {
  let mkdirRootPath = `./${Math.random()}`;
  let mkdirPath = `${mkdirRootPath}/${Math.random()}/${Math.random()}/${Math.random()}`;
  before(() => {});
  after(() => {});

  it("getAllDirs", async () => {
    let dirs = await getAllDirs("./test/path");
    expect(dirs.length).to.be.equal(3);
    expect(dirs[0]).to.be.equal("./test/path/path1");
    expect(dirs[1]).to.be.equal("./test/path/path1/path11");
    expect(dirs[2]).to.be.equal("./test/path/path2");
  });

  it("getAllDirsSync", async () => {
    let dirs = getAllDirsSync("./test/path");
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
  it("getDirsSync", async () => {
    let files = getDirsSync("./test/path");
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

  it("mkdirs", async () => {
    expect(await exists(mkdirPath)).to.be.false;

    await mkdirs(mkdirPath);
    await mkdirs(mkdirPath);

    expect(await exists(mkdirPath)).to.be.true;
  });

  it("mkdirsSync", async () => {
    expect(existsSync(mkdirPath)).to.be.true;
    rmdirSync(mkdirPath);

    expect(existsSync(mkdirPath)).to.be.false;

    mkdirsSync(mkdirPath);
    mkdirsSync(mkdirPath);

    expect(existsSync(mkdirPath)).to.be.true;
  });

  it("rmdir", async () => {
    expect(await exists(mkdirRootPath)).to.be.true;
    expect(await exists(mkdirPath)).to.be.true;

    await rmdir(mkdirRootPath);

    expect(await exists(mkdirPath)).to.be.false;
    expect(await exists(mkdirRootPath)).to.be.false;
  });

  it("rmdirSync", async () => {
    expect(existsSync(mkdirPath)).to.be.false;
    expect(existsSync(mkdirRootPath)).to.be.false;

    mkdirsSync(mkdirPath);

    expect(existsSync(mkdirRootPath)).to.be.true;
    expect(existsSync(mkdirPath)).to.be.true;

    rmdirSync(mkdirRootPath);

    expect(existsSync(mkdirPath)).to.be.false;
    expect(existsSync(mkdirRootPath)).to.be.false;
  });
});
