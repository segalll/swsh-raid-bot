module.exports = (client, guild) => {
    client.botGuilds.ensure(guild.id, { raidChannel: null, prefix: "r!", category: null });
    client.guildRaids.ensure(guild.id, []);
};
