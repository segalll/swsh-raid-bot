module.exports = (client, guild) => {
    for (let raid of client.guildRaids.get(guild.id)) {
        client.userRaids.delete(client.raids.get(raid).people[0]);
        client.raids.delete(raid);
    }
    client.botGuilds.delete(guild.id);
    client.guildRaids.delete(guild.id);
};
