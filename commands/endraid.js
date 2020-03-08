exports.run = async (client, message) => {
    if (!client.userRaids.get(message.author.id)) return;

    let mess;
    mess = await client.channels
        .get(client.botGuilds.get(client.raids.get(client.userRaids.get(message.author.id)).guild).raidChannel)
        .fetchMessage(client.userRaids.get(message.author.id))
        .catch(() => (mess = false));
    if (mess) await mess.delete();
    let chan = client.channels.get(client.raids.get(client.userRaids.get(message.author.id)).channel);
    if (chan) await chan.delete();
    client.raids.delete(client.userRaids.get(message.author.id));
    client.guildRaids.remove(message.guild.id, client.userRaids.get(message.author.id));
    client.userRaids.delete(message.author.id);
};

exports.help = {
    name: "endraid",
    aliases: [],
    description: "End your raid!",
    usage: "endraid"
};
