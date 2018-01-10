import { expect } from "chai";
import { getAllDirs, getAllDirsSync, getFilePath, getDirs, getDirsSync, exists, existsSync, mkdirs, mkdirsSync, mkdir, mkdirSync, rmdir, rmdirSync } from "../src/index";
import "mocha";
import { saveFileUtf8Sync } from "../src/file";

describe("path", function() {
  let mkdirRootPath = `./${Math.random()}`;
  let mkdirPath = `${mkdirRootPath}/${Math.random()}/${Math.random()}/${Math.random()}/${Math.random()}/${Math.random()}`;
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
    expect(await exists(mkdirRootPath)).to.be.false;
    expect(await exists(mkdirPath)).to.be.false;

    await mkdirs(mkdirPath);
    await mkdirs(mkdirPath);

    addFiles(mkdirPath);

    expect(await exists(mkdirPath)).to.be.true;
    expect(await exists(mkdirRootPath)).to.be.true;

    rmdirSync(mkdirRootPath);
    expect(await exists(mkdirPath)).to.be.false;
    expect(await exists(mkdirRootPath)).to.be.false;
  });

  it("mkdirsSync", async () => {
    expect(await exists(mkdirRootPath)).to.be.false;
    expect(existsSync(mkdirPath)).to.be.false;

    mkdirsSync(mkdirPath);
    mkdirsSync(mkdirPath); //这个操作多余，只为了测试

    addFiles(mkdirPath);

    expect(existsSync(mkdirPath)).to.be.true;
    expect(await exists(mkdirRootPath)).to.be.true;
    rmdirSync(mkdirRootPath);
    expect(existsSync(mkdirPath)).to.be.false;
    expect(await exists(mkdirRootPath)).to.be.false;
  });

  it("mkdir", async () => {
    expect(await exists(mkdirRootPath)).to.be.false;

    await mkdir(mkdirRootPath);
    await mkdir(mkdirRootPath);

    expect(await exists(mkdirRootPath)).to.be.true;

    rmdirSync(mkdirRootPath);
    rmdirSync(mkdirRootPath); // 多余操作，为了测试
    expect(await exists(mkdirRootPath)).to.be.false;
  });

  it("mkdirSync", async () => {
    expect(await exists(mkdirRootPath)).to.be.false;

    await mkdir(mkdirRootPath);
    await mkdir(mkdirRootPath);

    expect(await exists(mkdirRootPath)).to.be.true;

    rmdirSync(mkdirRootPath);
    rmdirSync(mkdirRootPath); // 多余操作，为了测试
    expect(await exists(mkdirRootPath)).to.be.false;
  });

  it("mkdirsSync with error", async () => {
    try {
      mkdirsSync("");
      expect(true).to.be.false; //进入这里就有问题了
    } catch (e) {
      expect(e.message).to.be.equal("path can not be empty!");
    }
  });

  it("rmdir", async () => {
    expect(await exists(mkdirRootPath)).to.be.false;
    expect(await exists(mkdirPath)).to.be.false;

    await mkdirs(mkdirPath);
    await mkdirs(mkdirPath); //这个操作多余，只为了测试

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
    mkdirsSync(mkdirPath); //这个操作多余，只为了测试

    expect(existsSync(mkdirRootPath)).to.be.true;
    expect(existsSync(mkdirPath)).to.be.true;

    rmdirSync(mkdirRootPath);

    expect(existsSync(mkdirPath)).to.be.false;
    expect(existsSync(mkdirRootPath)).to.be.false;
  });
});

function addFiles(dir: string) {
  saveFileUtf8Sync(`${dir}/file1.txt`, "111");

  dir = dir.substr(0, dir.lastIndexOf("/"));
  saveFileUtf8Sync(`${dir}/file1.txt`, "111");
  saveFileUtf8Sync(`${dir}/file2.txt`, "111");

  dir = dir.substr(0, dir.lastIndexOf("/"));
  saveFileUtf8Sync(`${dir}/file1.txt`, "111");
  saveFileUtf8Sync(`${dir}/file2.txt`, "111");
  saveFileUtf8Sync(`${dir}/file3.txt`, "111");

  dir = dir.substr(0, dir.lastIndexOf("/"));
  saveFileUtf8Sync(`${dir}/file1.txt`, "111");
  saveFileUtf8Sync(`${dir}/file2.txt`, "111");
  saveFileUtf8Sync(`${dir}/file3.txt`, "111");
  saveFileUtf8Sync(`${dir}/file4.txt`, "111");

  dir = dir.substr(0, dir.lastIndexOf("/"));
  saveFileUtf8Sync(`${dir}/file1.txt`, "111");
  saveFileUtf8Sync(`${dir}/file2.txt`, "111");
  saveFileUtf8Sync(`${dir}/file3.txt`, "111");
  saveFileUtf8Sync(`${dir}/file4.txt`, "111");
  saveFileUtf8Sync(`${dir}/file5.txt`, "111");
}
