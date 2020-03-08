exports.run = async (client, message) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return;

    let cmdUsage = client.commands.get("killraid", "help.usage");

    if (message.mentions.channels.first()) {
        let raidKey = client.raids.findKey(r => r.channel == message.mentions.channels.first().id && r.guild == message.guild.id);
        if (!raidKey)
            return message
                .reply("no raid found for that channel.")
                .then(msg => msg.delete(5000))
                .catch(err => client.logger.error(err));
        let raid = client.raids.get(raidKey);
        let mess;
        mess = await client.channels
            .get(client.botGuilds.get(message.guild.id).raidChannel)
            .fetchMessage(client.userRaids.get(message.author.id))
            .catch(() => (mess = false));
        if (mess) await mess.delete();
        let chan = client.channels.get(raid.channel);
        if (chan) await chan.delete();
        client.raids.delete(raidKey);
        client.guildRaids.remove(message.guild.id, raidKey);
        client.userRaids.delete(raid.people[0]);
        return message.reply("killed 1 raid.");
    }
    if (message.mentions.members.first()) {
        let dude = message.mentions.members.first().id;
        if (!client.userRaids.get(dude))
            return message
                .reply("no raid found for that user.")
                .then(msg => msg.delete(5000))
                .catch(err => client.logger.error(err));
        if (client.raids.get(client.userRaids.get(dude)).guild != message.guild.id)
            return message
                .reply("no raid found for that user in this guild.")
                .then(msg => msg.delete(5000))
                .catch(err => client.logger.error(err));
        let mess;
        mess = await client.channels
            .get(client.botGuilds.get(message.guild.id).raidChannel)
            .fetchMessage(client.userRaids.get(dude))
            .catch(() => (mess = false));
        if (mess) await mess.delete();
        let chan = client.channels.get(client.raids.get(client.userRaids.get(dude)).channel);
        if (chan) await chan.delete();
        client.raids.delete(client.userRaids.get(dude));
        client.guildRaids.remove(message.guild.id, client.userRaids.get(dude));
        client.userRaids.delete(dude);
        return message.reply("killed 1 raid.");
    }
    return message
        .reply(`usage: \`${client.prefix + cmdUsage}\``)
        .then(msg => msg.delete(5000))
        .catch(err => client.logger.error(err));
};

exports.help = {
    name: "killraid",
    aliases: [],
    description: "Forcefully ends a raid (ADMIN ONLY)",
    usage: "killraid <#channel or @user>"
};
