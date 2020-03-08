const { RichEmbed, Message, Client } = require("discord.js");

/**
 * @typedef {{people: string[], code: string, overflow: string[], channel: string, guild: string}} Raid
 * @param {Message} message
 * @param {Raid} raid
 */
const updateRaidMessage = async (message, raid) => {
    return new Promise(async resolve => {
        let newDescription = message.embeds[0].description.replace(/(?<=\()(.*?)(?=\/)/, raid.people.length);
        newDescription = newDescription.replace(/(?<=\) \()(.*?)(?= overflow)/, raid.overflow.length);
        let newMessage = new RichEmbed()
            .setAuthor(message.embeds[0].author.name, message.embeds[0].author.iconURL)
            .setColor(message.embeds[0].color)
            .setDescription(newDescription);
        await message.edit(newMessage);
        resolve();
    });
};

/**
 *
 * @param {Client} client
 * @param {string} raidID
 * @param {string} userID
 * @returns {Promise}
 */
const addRaidMember = async (client, raidID, userID) => {
    return new Promise(async resolve => {
        client.raids.pushIn(raidID, "people", userID);
        await client.channels.get(client.raids.get(raidID).channel).overwritePermissions(client.users.get(userID), {
            VIEW_CHANNEL: true
        });
        await client.channels.get(client.raids.get(raidID).channel).send("Welcome to the raid " + client.users.get(userID));
        resolve();
    });
};

/**
 *
 * @param {Client} client
 * @param {string} raidID
 * @param {string} userID
 * @returns {Promise}
 */
const removeRaidMember = async (client, raidID, userID) => {
    return new Promise(async resolve => {
        client.raids.removeFrom(raidID, "people", userID);
        await client.channels.get(client.raids.get(raidID).channel).overwritePermissions(client.users.get(userID), {
            VIEW_CHANNEL: false
        });
        let msgs = await client.channels.get(client.raids.get(raidID).channel).messages.filter(m => m.author.bot && m.mentions.members.first());
        if (msgs.size == 0) resolve();
        let msg = msgs.find(m => m.mentions.members.first().id == userID);
        if (msg) await msg.delete();
        resolve();
    });
};

/**
 *
 * @param {Client} client
 * @param {string} raidID
 * @returns {Promise}
 */
const shiftOverflow = async (client, raidID) => {
    return new Promise(async resolve => {
        let raidOverflow = client.raids.get(raidID).overflow;
        let newGuy = raidOverflow.shift();
        client.raids.setProp(raidID, "overflow", raidOverflow);
        await addRaidMember(newGuy);
    });
};

/**
 *
 * @param {Client} client
 * @param {string} raidID
 * @param {string} userID
 */
const addToOverflow = (client, raidID, userID) => {
    client.raids.pushIn(raidID, "overflow", userID);
};

/**
 *
 * @param {Client} client
 * @param {string} raidID
 * @param {string} userID
 */
const removeFromOverflow = (client, raidID, userID) => {
    client.raids.removeFrom(raidID, "overflow", userID);
};

module.exports = {
    updateRaidMessage,
    addRaidMember,
    removeRaidMember,
    shiftOverflow,
    addToOverflow,
    removeFromOverflow
};
