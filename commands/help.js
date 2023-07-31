const {RichEmbed} = require('discord.js');
const {embedColor} = require('../config');
const {noBotPerms} = require('../utils/errors');

exports.run = async (client, message, args) => {
  const perms = message.guild.me.permissions;
  if (!perms.has('EMBED_LINKS')) return noBotPerms(message, 'EMBED_LINKS');

  const cmds = Array.from(client.commands.keys());
  const cmd = args[0];

  const cmdName = client.commands.get('help', 'help.name');

  if (cmd) {
    const cmdObj = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (!cmdObj) return;
    const cmdHelp = cmdObj.help;

    const cmdHelpEmbed = new RichEmbed()
      .setTitle(`${cmdHelp.name} | Help Information`)
      .setDescription(cmdHelp.description)
      .addField('Usage', `\`${cmdHelp.usage}\``, true)
      .setColor(embedColor);

    if (cmdHelp.aliases.length) cmdHelpEmbed.addField('Aliases', `\`${cmdHelp.aliases.join(', ')}\``, true);

    return message.channel.send(cmdHelpEmbed);
  }

  const helpCmds = cmds.map((cmd) => `\`${cmd}\``);

  const helpEmbed = new RichEmbed()
    .setTitle('Help Information')
    .setDescription(`View help information for ${client.user}. \n (Do \`${client.prefix + cmdName} <command>\` for specific help information).`)
    .addField('Current Prefix', client.prefix)
    .addField('Bot Commands', helpCmds.join(' | '))
    .setColor(embedColor);

  message.channel.send(helpEmbed);
};

exports.help = {
  name: 'help',
  aliases: ['h', 'halp'],
  description: 'View all commands and where to receive bot support.',
  usage: 'help',
};
