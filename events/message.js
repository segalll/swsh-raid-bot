module.exports = async (client, message) => {
    if (!message.guild) return;

    client.botGuilds.ensure(message.guild.id, { raidChannel: null, prefix: "r!" });

    let prefix = client.botGuilds.get(message.guild.id).prefix;

    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;

    client.prefix = prefix;

    const args = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    if (!cmd) return;

    cmd.run(client, message, args);
};
