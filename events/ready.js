const {version} = require('../package.json');

module.exports = async (client) => {
  await client.logger.log(`Logged in as ${client.user.tag} (${client.user.id}) in ${client.guilds.size} server(s).`);
  await client.logger.log(`Version ${version} of the bot loaded.`);

  const cmdHelp = client.commands.get('help', 'help.name');

  for (const guild of client.guilds.array()) {
    client.botGuilds.ensure(guild.id, {raidChannel: null, prefix: 'r!', category: null});
    client.guildRaids.ensure(guild.id, []);
  }

  client.user.setStatus('online');
  client.user.setActivity(`r!${cmdHelp}`, {type: 'WATCHING'}).catch((err) => client.logger.error(err));
};
