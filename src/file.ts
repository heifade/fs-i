import { readdirSync, statSync, readFileSync, writeFileSync, unlinkSync, existsSync, renameSync as fsRenameSync } from "fs";
import { isDirectory } from "./path";

/**
 * 递归指定目录下的所有子目录，找出所有文件
 *
 * @export
 * @param {string} path - 指定目录
 * @returns
 */
export async function getAllFiles(path: string) {
  return getAllFilesSync(path);
}

/**
 * 递归指定目录下的所有子目录，找出所有文件，(同步)
 *
 * @export
 * @param {string} path - 指定目录
 * @returns
 */
export function getAllFilesSync(path: string) {
  path = path.replace(/\/$/, "");
  let files = readdirSync(path);

  let fileList: string[] = [];

  for (let file of files) {
    let fileFullName = `${path}/${file}`;

    if (isDirectory(fileFullName)) {
      fileList = fileList.concat(getAllFilesSync(`${fileFullName}/`));
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
  return getFilesSync(path);
}

/**
 * 获取指定目录下的文件,(同步)
 *
 * @export
 * @param {string} path - 指定目录
 * @returns
 */
export function getFilesSync(path: string) {
  path = path.replace(/\/$/, "");
  let files = readdirSync(path);

  let fileList: string[] = [];

  for (let file of files) {
    let fileFullName = `${path}/${file}`;

    if (isFile(fileFullName)) {
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
  return readFileUtf8Sync(fileName);
}

/**
 * 以utf8编码读取文件,(同步)
 *
 * @export
 * @param {string} fileName
 * @returns
 */
export function readFileUtf8Sync(fileName: string) {
  return readFileSync(fileName, { encoding: "utf-8" });
}

/**
 * 以utf8编码保存文件
 *
 * @export
 * @param {string} fileName
 * @param {string} content
 */
export async function saveFileUtf8(fileName: string, content: string) {
  await writeFileSync(fileName, content, { encoding: "utf-8" });
}

/**
 * 以utf8编码读取文件,(同步)
 *
 * @export
 * @param {string} fileName
 * @param {string} content
 */
export function saveFileUtf8Sync(fileName: string, content: string) {
  writeFileSync(fileName, content, { encoding: "utf-8" });
}

/**
 * 删除文件
 * 
 * @export
 * @param {string} fileName 
 */
export async function deleteFile(fileName: string) {
  await deleteFileSync(fileName);
}

/**
 * 删除文件，(同步)
 * 
 * @export
 * @param {string} fileName 
 */
export function deleteFileSync(fileName: string) {
  if (existsSync(fileName)) {
    unlinkSync(fileName);
  }
}

/**
 * 更改名称
 * 
 * @export
 * @param {string} oldName 
 * @param {string} newName 
 */
export function renameSync(oldName: string, newName: string) {
  fsRenameSync(oldName, newName);
}

/**
 * 是否是文件
 * 
 * @export
 * @param {string} fileName 
 * @returns 
 */
export function isFile(fileName: string) {
  return statSync(fileName).isFile();
}