exports.run = async (client, message) => {
  if (!message.member.hasPermission('ADMINISTRATOR')) return;

  const cmdUsage = client.commands.get('raidchannel', 'help.usage');

  if (!message.mentions.channels.first()) {
    return message
      .reply(`usage: \`${client.prefix + cmdUsage}\``)
      .then((msg) => msg.delete(5000))
      .catch((err) => client.logger.error(err));
  }

  client.botGuilds.setProp(message.guild.id, 'raidChannel', message.mentions.channels.first().id);
  return message.reply(`set raid channel to ${message.mentions.channels.first()}`);
};

exports.help = {
  name: 'raidchannel',
  aliases: [],
  description: 'Sets the channel in which raids are sent in (ADMIN ONLY)',
  usage: 'raidchannel <#channel>',
};
