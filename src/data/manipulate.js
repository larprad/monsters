import monsters from './monsters';

const manipulate = {
  validateContent(assetToCheck, dataPool) {
    for (let unit in dataPool) {
      if (!assetToCheck) {
        return {
          status: false,
          message: 'Name should not be empty',
        };
      }
      if (unit.toLowerCase() === assetToCheck.toLowerCase()) {
        return {
          status: false,
          message: 'Name is already existing',
        };
      }
    }
    return {
      status: true,
      message: 'Monster saved',
    };
  },

  saveNewMonster(data) {
    const checkResult = this.validateContent(data.name, monsters);
    if (checkResult.status) {
      monsters[data.slug.toLowerCase()] = data;
    }
    return checkResult;
  },

  editMonster(data) {},
};

export default manipulate;
