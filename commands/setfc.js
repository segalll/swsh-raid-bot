exports.run = async (client, message, args) => {
    await message.delete();

    let cmdUsage = client.commands.get("setfc", "help.usage");

    if (args.length != 1) {
        return message
            .reply(`usage: \`${client.prefix + cmdUsage}\``)
            .then(msg => msg.delete(5000))
            .catch(err => client.logger.error(err));
    }

    let code = args[0].replace(/-/g, "");
    if (code.length != 12 || !/^\d+$/.test(code)) {
        return message
            .reply("invalid code.")
            .then(msg => msg.delete(5000))
            .catch(err => client.logger.error(err));
    }
    client.userCodes.set(message.author.id, code.replace(/(\d{4})/g, "$1-").replace(/(^-|-$)/, ""));
    message.author.send("The friend code you entered is " + client.userCodes.get(message.author.id)).catch(() => message.reply("I tried to PM you the code you entered to confirm, but your DMs are disabled. If you want to confirm the code you entered, enable your DMs and type `!checkfc`"));
};

exports.help = {
    name: "setfc",
    aliases: [],
    description: "Set your friend code.",
    usage: "setfc <friendcode>"
};
