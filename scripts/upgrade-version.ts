import { readJSONFile, writeJSONFile } from './util/file';
import { getRootPackageJSON, getAllSubPackageDirs } from './util/project';
const pkg = getRootPackageJSON();
const version = pkg.version;

async function run() {
  const pkgDirs = getAllSubPackageDirs();
  const allPkgMap: Record<string, { file: string; json: any }> = {};
  pkgDirs.forEach((dir) => {
    const file = ['packages', dir, 'package.json'].join('/');
    const json = readJSONFile('packages', dir, 'package.json');
    allPkgMap[json.name] = { file, json };
  });
  for (const key in allPkgMap) {
    if (allPkgMap.hasOwnProperty(key)) {
      console.log(
        `Upgrade [${key}] from ${allPkgMap[key].json.version} to ${version}`
      );
      allPkgMap[key].json.version = version;
      if (allPkgMap[key]?.json?.dependencies) {
        for (const depName in allPkgMap[key].json.dependencies) {
          if (allPkgMap.hasOwnProperty(depName)) {
            allPkgMap[key].json.dependencies[depName] = `^${version}`;
          }
        }
      }
    }
    writeJSONFile(allPkgMap[key].file, allPkgMap[key].json);
  }
}

run()
  .then(() => {
    console.log(`[@idraw]: Upgrade all packages version ${version} success!`);
  })
  .catch((err) => {
    console.error(err);
    throw err;
  });
