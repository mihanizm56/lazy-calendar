const path = require('path');
const rimraf = require('rimraf');
const glob = require('glob');

const pathToBuild = path.join(process.cwd(), 'lib');
const paths = glob.sync(
  `${pathToBuild}/**/?(stories|__tests__|__test__|tests|test|decorators)`,
);

paths.forEach(item => {
  rimraf.sync(item);
});
