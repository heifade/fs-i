import { emptyDirSync, rmdirSync as fsExtRmdirSync, mkdirsSync as fsExtMkdirsSync, readdirSync, statSync, existsSync as fsExtExistsSync } from "fs-extra";

/**
 * 递归指定目录下的所有子目录，找出所有子目录
 *
 * @export
 * @param {string} path - 指定目录
 * @returns
 */
export async function getAllDirs(path: string) {
  return getAllDirsSync(path);
}

/**
 * 递归指定目录下的所有子目录，找出所有子目录,(同步)
 *
 * @export
 * @param {string} path - 指定目录
 * @returns
 */
export function getAllDirsSync(path: string) {
  path = path.replace(/\/$/, "");
  let files = readdirSync(path);

  let fileList: string[] = [];

  for (let file of files) {
    let fileFullName = `${path}/${file}`;

    if (statSync(fileFullName).isDirectory()) {
      fileList.push(`${fileFullName}`);

      fileList = fileList.concat(getAllDirsSync(`${fileFullName}/`));
    }
  }

  return fileList;
}

/**
 * 获取指定目录下的子目录
 *
 * @export
 * @param {string} path - 指定目录
 * @returns
 */
export async function getDirs(path: string) {
  return getDirsSync(path);
}

/**
 * 获取指定目录下的子目录,(同步)
 *
 * @export
 * @param {string} path - 指定目录
 * @returns
 */
export function getDirsSync(path: string) {
  path = path.replace(/\/$/, "");
  let files = readdirSync(path);

  let fileList: string[] = [];

  for (let file of files) {
    let fileFullName = `${path}/${file}`;

    if (statSync(fileFullName).isDirectory()) {
      fileList.push(`${fileFullName}`);
    }
  }

  return fileList;
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

/**
 * 创建目录
 *
 * @export
 * @param {string} dir
 */
export async function mkdirs(dir: string) {
  mkdirsSync(dir);
}

/**
 * 创建目录,（同步）
 *
 * @export
 * @param {string} dir
 */
export function mkdirsSync(dir: string) {
  if (!existsSync(dir)) {
    fsExtMkdirsSync(dir);
  }
}

/**
 * 删除目录及子目录
 *
 * @export
 * @param {string} dir
 */
export async function rmdir(dir: string) {
  rmdirSync(dir);
}

/**
 * 删除目录及子目录,(同步)
 *
 * @export
 * @param {string} dir
 */
export function rmdirSync(dir: string) {
  emptyDirSync(dir);
  fsExtRmdirSync(dir);
}

/**
 * 文件/目录是否存在
 *
 * @export
 * @param {string} dir
 * @returns
 */
export async function exists(dir: string) {
  return existsSync(dir);
}

/**
 * 文件/目录是否存在,(同步)
 *
 * @export
 * @param {string} dir
 * @returns
 */
export function existsSync(dir: string) {
  return fsExtExistsSync(dir);
}
