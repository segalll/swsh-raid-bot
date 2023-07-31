require('dotenv-flow').config();

module.exports = {
  owner: process.env.OWNER,
  embedColor: process.env.DEFAULT_COLOR,
  invite: process.env.INVITE,
};
