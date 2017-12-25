import { readdirSync, statSync, readFileSync } from "fs-extra";

/**
 * 递归指定目录下的所有子目录，找出所有文件
 *
 * @export
 * @param {string} path - 指定目录
 * @returns
 */
export async function getAllFiles(path: string) {
  path = path.replace(/\/$/, "");
  let files = readdirSync(path);

  let fileList: string[] = [];

  for (let file of files) {
    let fileFullName = `${path}/${file}`;

    if (statSync(fileFullName).isDirectory()) {
      fileList = fileList.concat(await getAllFiles(`${fileFullName}/`));
    } else {
      fileList.push(`${fileFullName}`);
    }
  }

  return fileList;
}

/**
 * 获取指定目录下的文件
 *
 * @export
 * @param {string} path - 指定目录
 * @returns
 */
export async function getFiles(path: string) {
  path = path.replace(/\/$/, "");
  let files = readdirSync(path);

  let fileList: string[] = [];

  for (let file of files) {
    let fileFullName = `${path}/${file}`;

    if (statSync(fileFullName).isFile()) {
      fileList.push(`${fileFullName}`);
    }
  }

  return fileList;
}

/**
 * 获取文件名，如： c:/a/b/c.txt => c.txt
 *
 * @export
 * @param {string} fileName
 * @returns
 */
export function getFileName(fileName: string) {
  let file = (fileName || "").replace(/\\/g, "/");
  let p = file.lastIndexOf("/");
  return file.substr(p + 1);
}

/**
 * 以utf8编码读取文件
 * 
 * @export
 * @param {string} fileName 
 * @returns 
 */
export async function readFileUtf8(fileName: string) {
  return readFileSync(fileName, { encoding: "utf-8" });
}