const {RichEmbed} = require('discord.js');

/**
 * @typedef {{people: string[], code: string, overflow: string[], channel: string, guild: string}} Raid
 * @param {Message} message
 * @param {Raid} raid
 */
const updateRaidMessage = async (message, raid) => new Promise((resolve) => {
  let newDescription = message.embeds[0].description.replace(/(?<=\()(.*?)(?=\/)/, raid.people.length);
  newDescription = newDescription.replace(/(?<=\) \()(.*?)(?= overflow)/, raid.overflow.length);
  const newMessage = new RichEmbed()
    .setAuthor(message.embeds[0].author.name, message.embeds[0].author.iconURL)
    .setColor(message.embeds[0].color)
    .setDescription(newDescription);
  message.edit(newMessage).then(resolve);
});

/**
 *
 * @param {Client} client
 * @param {string} raidID
 * @param {string} userID
 * @return {Promise}
 */
const addRaidMember = async (client, raidID, userID) => new Promise((resolve) => {
  client.raids.pushIn(raidID, 'people', userID);
  client.channels.get(client.raids.get(raidID).channel).overwritePermissions(client.users.get(userID), {
    VIEW_CHANNEL: true,
  }).then(() => {
    client.channels.get(client.raids.get(raidID).channel).send(`Welcome to the raid ${client.users.get(userID)}`).then(resolve);
  });
});

/**
 *
 * @param {Client} client
 * @param {string} raidID
 * @param {string} userID
 * @return {Promise}
 */
const removeRaidMember = async (client, raidID, userID) => new Promise((resolve) => {
  client.raids.removeFrom(raidID, 'people', userID);
  client.channels.get(client.raids.get(raidID).channel).overwritePermissions(client.users.get(userID), {
    VIEW_CHANNEL: false,
  }).then(() => {
    client.channels.get(client.raids.get(raidID).channel).messages.filter((m) => m.author.bot && m.mentions.members.first()).then((msgs) => {
      if (msgs.size == 0) resolve();
      const msg = msgs.find((m) => m.mentions.members.first().id == userID);
      if (msg) msg.delete().then(resolve);
    });
  });
});

/**
 *
 * @param {Client} client
 * @param {string} raidID
 * @return {Promise}
 */
const shiftOverflow = async (client, raidID) => new Promise((resolve) => {
  const raidOverflow = client.raids.get(raidID).overflow;
  const newGuy = raidOverflow.shift();
  client.raids.setProp(raidID, 'overflow', raidOverflow);
  addRaidMember(newGuy).then(resolve);
});

/**
 *
 * @param {Client} client
 * @param {string} raidID
 * @param {string} userID
 */
const addToOverflow = (client, raidID, userID) => {
  client.raids.pushIn(raidID, 'overflow', userID);
};

/**
 *
 * @param {Client} client
 * @param {string} raidID
 * @param {string} userID
 */
const removeFromOverflow = (client, raidID, userID) => {
  client.raids.removeFrom(raidID, 'overflow', userID);
};

module.exports = {
  updateRaidMessage,
  addRaidMember,
  removeRaidMember,
  shiftOverflow,
  addToOverflow,
  removeFromOverflow,
};
