// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
const packages = [
  {
    dirName: 'base',
    globalName: 'iDrawStudioBase'
  },
  {
    dirName: 'studio',
    globalName: 'iDrawStudio'
  }
];

function getTargetPackage(cmdTarget = '') {
  let target = '';
  if (typeof cmdTarget === 'string') {
    target = cmdTarget.replace(/^--target-pkg\=/gi, '');
  }
  let pkgs = [];
  let targetIndex = -1;
  for (let i = 0; i < packages.length; i++) {
    if (packages[i] && packages[i].dirName === target) {
      targetIndex = i;
      break;
    }
  }
  if (targetIndex >= 0) {
    pkgs = [packages[targetIndex]];
  } else {
    pkgs = packages;
  }
  return pkgs;
}

export { packages, getTargetPackage };
