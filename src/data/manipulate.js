const manipulate = {
  async saveNewMonsterServer(monsterData) {
    // ERROR HANDLING TO DO !!
    try {
      console.log('start saving');
      const response = await fetch('/monster', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(monsterData),
      });
      if (response.ok) {
        console.log('save response is ok');
      } else {
        console.log(`error while saving data`);
        const content = await response.json();
        console.log('content response is:' + content);
        return content;
      }
    } catch (error) {
      console.log(`error while saving data: ${error}`);
    }
    return monsterData.slug;
  },

  async deleteMonsterServer(monsterKey) {
    try {
      console.log(`start deleting`);
      const response = await fetch(`/monster/${monsterKey}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        console.log('monster deleted');
      } else {
        console.log('something went wrong while deleting');
      }
    } catch (error) {
      console.log(`error while deleting: ${error}`);
    }
  },

  async editMonsterServer(monsterData, nameOfEditedMonster) {
    try {
      console.log('start editing');
      const response = await fetch('/monster/' + nameOfEditedMonster, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(monsterData),
      });
      if (response.ok) {
        console.log('edit response is ok');
      } else {
        console.log(`error while editing data`);
      }
    } catch (error) {
      console.log(`error while editing data: ${error}`);
    }
    return monsterData.slug;
  },

  async getAllMonsters(monsterNumber, monsterOrder) {
    const request = '/allMonsters/' + monsterNumber + '/' + monsterOrder;
    console.log('getting all the monsters: ' + request);
    try {
      let response = await fetch(request);
      if (response.ok) {
        let responseJSON = await response.json();
        return responseJSON;
      } else {
        console.error('error fetching monster data');
      }
    } catch (error) {
      console.log('error while getting all monsters');
    }
  },
};

export default manipulate;
