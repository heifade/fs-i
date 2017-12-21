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
