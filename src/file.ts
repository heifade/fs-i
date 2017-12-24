import { readdirSync, statSync } from "fs";

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
 * 递归指定目录下的所有子目录，找出所有子目录
 *
 * @export
 * @param {string} path - 指定目录
 * @returns
 */
export async function getAllDirs(path: string) {
  path = path.replace(/\/$/, "");
  let files = readdirSync(path);

  let fileList: string[] = [];

  for (let file of files) {
    let fileFullName = `${path}/${file}`;

    if (statSync(fileFullName).isDirectory()) {
      fileList.push(`${fileFullName}`);

      fileList = fileList.concat(await getAllDirs(`${fileFullName}/`));
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
 * 获取文件路径，如： c:/a/b/c.txt => c:/a/b
 *
 * @export
 * @param {string} fileName
 * @returns
 */
export function getFilePath(fileName: string) {
  let file = (fileName || "").replace(/\\/g, "/");
  let p = file.lastIndexOf("/");
  return file.substr(0, p);
}
