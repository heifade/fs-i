import { expect } from "chai";
import {
  getAllDirs,
  getAllDirsSync,
  getFilePath,
  getDirs,
  getDirsSync,
  exists,
  existsSync,
  mkdirs,
  mkdirsSync,
  mkdir,
  mkdirSync,
  rmdir,
  rmdirSync,
  readFileUtf8Sync,
  copy,
  saveFileUtf8Sync,
  deleteFileSync,
  isFile,
  copySync,
  isDirectory
} from "../src/index";
import "mocha";

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

  it("copySync", async () => {
    let path1 = "./test/path";
    let path2 = "./test/path2";

    expect(existsSync(path1)).to.be.true;
    expect(existsSync(path2)).to.be.false;

    copySync(path1, path2, { overwrite: true });

    expect(existsSync(path1)).to.be.true;
    expect(existsSync(path2)).to.be.true;

    let file1 = `${path1}/path1/path11/file112.txt`;
    let file2 = `${path2}/path1/path11/file112.txt`;
    saveFileUtf8Sync(file1, "111");

    expect(existsSync(file1)).to.be.true;

    expect(existsSync(file2)).to.be.false;

    copySync(path1, path2, { overwrite: true });

    expect(existsSync(file2)).to.be.true;

    expect(readFileUtf8Sync(file2)).to.be.equal("111");

    saveFileUtf8Sync(file1, "11122");

    copySync(path1, path2, { overwrite: true });

    expect(readFileUtf8Sync(file2)).to.be.equal("11122");

    saveFileUtf8Sync(file1, "1112233");
    copySync(path1, path2, { overwrite: false });
    copySync(path1, path2);
    expect(readFileUtf8Sync(file2)).to.be.equal("11122");

    let file21 = `${path1}/path1/path11/file113.txt`;
    let file22 = `${path2}/path1/path11/file113.txt`;

    saveFileUtf8Sync(file21, "123"); // 源是文件
    mkdirSync(file22); // 目标是目录
    expect(existsSync(file22) && isDirectory(file22)).to.be.true;
    copySync(path1, path2, { overwrite: true });
    expect(existsSync(file22) && isFile(file22)).to.be.true;
    deleteFileSync(file22);
    deleteFileSync(file21);

    saveFileUtf8Sync(file21, "123"); // 源是文件
    mkdirSync(file22); // 目标是目录
    expect(existsSync(file22) && isDirectory(file22)).to.be.true;
    copySync(path1, path2);
    expect(existsSync(file22) && isDirectory(file22)).to.be.true;
    rmdirSync(file22);
    deleteFileSync(file21);

    mkdirSync(file21); // 源是目录
    saveFileUtf8Sync(file22, "123"); // 目标是文件
    expect(existsSync(file22) && isFile(file22)).to.be.true;
    copySync(path1, path2, { overwrite: true });
    expect(existsSync(file22) && isDirectory(file22)).to.be.true;
    rmdirSync(file21);
    rmdirSync(file22);

    mkdirSync(file21); // 源是目录
    saveFileUtf8Sync(file22, "123"); // 目标是文件
    expect(existsSync(file22) && isFile(file22)).to.be.true;
    copySync(path1, path2);
    expect(existsSync(file22) && isFile(file22)).to.be.true;
    rmdirSync(file21);

    rmdirSync(path2);
    expect(existsSync(path2)).to.be.false;

    deleteFileSync(file1);
    expect(existsSync(file1)).to.be.false;
  });
});

it("copy", async () => {
  let path1 = "./test/path";
  let path2 = "./test/path2";

  expect(existsSync(path1)).to.be.true;
  expect(existsSync(path2)).to.be.false;

  await copy(path1, path2, { overwrite: true });

  expect(existsSync(path1)).to.be.true;
  expect(existsSync(path2)).to.be.true;

  rmdirSync(path2);
  expect(existsSync(path2)).to.be.false;
});

it("copySync with error", async () => {
  let path1 = "./test/path555";
  let path2 = "./test/path2";

  expect(existsSync(path1)).to.be.false;
  expect(existsSync(path2)).to.be.false;

  try {
    copySync(path1, path2, { overwrite: true });
    expect(true).to.be.false; // 进入这里就有问题了
  } catch (e) {
    expect((e.message || "").endsWith(" is not exists!")).to.be.true;
  }
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
