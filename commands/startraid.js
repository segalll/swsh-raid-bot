exports.run = async (client, message) => {
    if (!client.userRaids.get(message.author.id)) return;

    client.channels.get(client.raids.get(client.userRaids.get(message.author.id)).channel).send(`Raid Code: ${client.raids.get(client.userRaids.get(message.author.id)).code}\nFriend Code: ${client.userCodes.get(message.author.id)}`);

    let mess;
    mess = await client.channels
        .get(client.botGuilds.get(client.raids.get(client.userRaids.get(message.author.id)).guild).raidChannel)
        .fetchMessage(client.userRaids.get(message.author.id))
        .catch(() => (mess = false));
    if (mess) await mess.delete();
};

exports.help = {
    name: "startraid",
    aliases: [],
    description: "Start your raid!",
    usage: "startraid"
};
