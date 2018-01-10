import { rmdirSync as fsRmdirSync, readdirSync, statSync, existsSync as fsExistsSync, mkdirSync as fsMkdirSync, unlinkSync, copyFileSync } from "fs";
import { join as pathJoin, dirname as pathDirname } from "path";
import { deleteFileSync, deleteFile, isFile } from "./file";

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

    if (isDirectory(fileFullName)) {
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

    if (isDirectory(fileFullName)) {
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
  if (!dir) {
    throw new Error(`path can not be empty!`);
  }

  if (!existsSync(dir)) {
    dir = dir.replace(/\\/g, "/");
    mkdirsSync(pathDirname(dir));
    mkdirSync(dir);
  }
}

/**
 * 创建目录
 *
 * @export
 * @param {string} dir
 */
export async function mkdir(dir: string) {
  await mkdirSync(dir);
}

/**
 * 创建目录,（同步）
 *
 * @export
 * @param {string} dir
 */
export function mkdirSync(dir: string) {
  if (!existsSync(dir)) {
    fsMkdirSync(dir);
  }
}

/**
 * 删除目录及子目录
 *
 * @export
 * @param {string} dir
 */
export async function rmdir(dir: string) {
  await rmdirSync(dir);
}

/**
 * 删除目录及子目录,(同步)
 *
 * @export
 * @param {string} dir
 */
export function rmdirSync(dir: string) {
  if (existsSync(dir)) {
    readdirSync(dir).forEach(file => {
      let fullFile = pathJoin(dir, file);
      if (isDirectory(fullFile)) {
        rmdirSync(fullFile);
      } else {
        unlinkSync(fullFile);
      }
    });

    fsRmdirSync(dir);
  }
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
  return fsExistsSync(dir);
}

/**
 * 复制目录
 *
 * @export
 * @param {string} sourceDir - 源目录
 * @param {string} targetDir - 目标目录
 * @param {{ overwrite: boolean }} options
 */
export async function copy(sourceDir: string, targetDir: string, options: { overwrite: boolean }) {
  await copySync(sourceDir, targetDir, options);
}

/**
 * 复制目录，(同步)
 *
 * @export
 * @param {string} sourceDir - 源目录
 * @param {string} targetDir - 目标目录
 * @param {{ overwrite: boolean }} options
 */
export function copySync(sourceDir: string, targetDir: string, options?: { overwrite: boolean }) {
  if (existsSync(sourceDir)) {
    if (isDirectory(sourceDir)) {
      // 源是目录
      if (existsSync(targetDir)) {
        if (isFile(targetDir)) {
          if (options && options.overwrite) {
            deleteFileSync(targetDir);
            mkdirSync(targetDir);
          } else {
            return;
          }
        }
      } else {
        mkdirSync(targetDir);
      }

      readdirSync(sourceDir).forEach(file => {
        let sourceFullName = pathJoin(sourceDir, file);
        let targetFullName = pathJoin(targetDir, file);

        copySync(sourceFullName, targetFullName, options);
      });
    } else {
      // 源是文件
      if (existsSync(targetDir)) {
        if (isDirectory(targetDir)) {
          // 目标存在且是目录
          if (options && options.overwrite) {
            rmdirSync(targetDir);
          } else {
            return;
          }
        } else {
          // 目标存在且是文件
          if (options && options.overwrite) {
            deleteFileSync(targetDir);
          } else {
            return;
          }
        }
      }
      // 目标不存在
      copyFileSync(sourceDir, targetDir);
    }
  } else {
    throw new Error(`${sourceDir} is not exists!`);
  }
}

/**
 * 是否是目录
 *
 * @export
 * @param {string} dir
 * @returns
 */
export function isDirectory(dir: string) {
  return statSync(dir).isDirectory();
}
