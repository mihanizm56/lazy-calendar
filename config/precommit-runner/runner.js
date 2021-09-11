/* eslint-disable no-console */

// eslint-disable-next-line import/no-extraneous-dependencies
const { Listr } = require('listr2');
const { exec } = require('../../utils/fs-promises');

const runner = async () => {
  const tasksRunner = new Listr(
    [
      {
        title: 'Запуск Eslint and Stylelint',
        task: async () => {
          await exec('npm run lint');
        },
      },
      {
        title: 'Сборка проекта',
        task: async () => {
          await exec('npm run build');
        },
      },
    ],
    {
      concurrent: true,
    },
  );

  try {
    await tasksRunner.run();
  } catch (error) {
    console.log(error.stdout || error.message);
    process.exit(1);
  }
};

runner();
