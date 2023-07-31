exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('ADMINISTRATOR')) return;

  const cmdUsage = client.commands.get('raidcategory', 'help.usage');

  if (args.length != 1) {
    return message
      .reply(`usage: \`${client.prefix + cmdUsage}\``)
      .then((msg) => msg.delete(5000))
      .catch((err) => client.logger.error(err));
  }

  const channelCategory = message.guild.channels.get(args[0]);
  if (!/^\d+$/.test(args[0]) || !channelCategory) {
    return message
      .reply('invalid category ID.')
      .then((msg) => msg.delete(5000))
      .catch((err) => client.logger.error(err));
  }

  if (channelCategory.type != 'category') {
    return message
      .reply('invalid category ID.')
      .then((msg) => msg.delete(5000))
      .catch((err) => client.logger.error(err));
  }

  client.botGuilds.setProp(message.guild.id, 'category', args[0]);
  return message.reply(`set raid category to ${channelCategory.name}.`);
};

exports.help = {
  name: 'raidcategory',
  aliases: [],
  description: 'Sets the category in which raid channels are created (ADMIN ONLY)',
  usage: 'raidcategory <#category ID>',
};
