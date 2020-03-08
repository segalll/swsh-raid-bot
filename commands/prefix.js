exports.run = async (client, message, args) => {
    let cmdUsage = client.commands.get("prefix", "help.usage");

    if (args.length != 1) {
        return message
            .reply(`usage: \`${client.prefix + cmdUsage}\``)
            .then(msg => msg.delete(5000))
            .catch(err => client.logger.error(err));
    }
    if (!message.member.hasPermission("ADMINISTRATOR")) return;
    client.botGuilds.setProp(message.guild.id, "prefix", args[0]);
    return message.reply("set prefix to " + args[0]);
};

exports.help = {
    name: "prefix",
    aliases: [],
    description: "Set the bot's prefix",
    usage: "prefix <new prefix>"
};
