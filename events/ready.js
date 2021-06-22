const client = require('../index')
const { message } = require("./message")

client.on('ready', () => { 

  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
    activity: {
      name: `LMHT`,
      type: 'WATCHING'
    },
    status: 'online'
  })
});