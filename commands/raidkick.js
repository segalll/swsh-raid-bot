const {removeRaidMember, shiftOverflow, updateRaidMessage} = require('../utils/raidfuncs.js');

exports.run = async (client, message) => {
  if (!client.userRaids.get(message.author.id)) {
    return message
      .reply('you don\'t have a raid.')
      .then((msg) => msg.delete(5000))
      .catch((err) => client.logger.error(err));
  }

  const cmdUsage = client.commands.get('raidkick', 'help.usage');

  if (!message.mentions.members.first()) {
    return message
      .reply(`usage: \`${client.prefix + cmdUsage}\``)
      .then((msg) => msg.delete(5000))
      .catch((err) => client.logger.error(err));
  }

  if (!client.raids.get(client.userRaids.get(message.author.id)).people.includes(message.mentions.members.first().id)) {
    return message
      .reply('this person is not in your raid.')
      .then((msg) => msg.delete(5000))
      .catch((err) => client.logger.error(err));
  }

  if (message.mentions.members.first().id == message.author.id) {
    return message
      .reply('you can\'t kick yourself.')
      .then((msg) => msg.delete(5000))
      .catch((err) => client.logger.error(err));
  }

  await removeRaidMember(client, client.userRaids.get(message.author.id), message.mentions.members.first().id);

  if (client.raids.get(client.userRaids.get(message.author.id)).overflow.length > 0) {
    await shiftOverflow(client, client.userRaids.get(message.author.id));
  }

  const msg = await client.channels.get(client.botGuilds.get(message.guild.id).raidChannel).fetchMessage(client.userRaids.get(message.author.id));
  await updateRaidMessage(msg, client.raids.get(client.userRaids.get(message.author.id)));
  await msg.reactions.get('✅').remove(message.mentions.members.first());
};

exports.help = {
  name: 'raidkick',
  aliases: [],
  description: 'Kick person from your raid.',
  usage: 'raidkick @person',
};
