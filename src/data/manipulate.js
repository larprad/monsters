import monsters from './monsters';

const manipulate = {
  saveNewMonster(data) {
    monsters[data.slug] = data;
    console.log(`monster ${data.slug} saved`);
  },

  deleteMonster(monsterKey) {
    const deleted = delete monsters[monsterKey];
    deleted
      ? console.log(`${monsterKey} have been deleted`)
      : console.error(`${monsterKey} not properly deleted`);
  },

  editMonster(data, originalMonsterKey) {
    console.log(originalMonsterKey);
    delete monsters[originalMonsterKey]; // seriously non optimized
    monsters[data.slug] = data;
  },
};

export default manipulate;
