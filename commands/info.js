const { RichEmbed } = require("discord.js");
const { embedColor, owner } = require("../config");
const { version } = require("../package.json");
const { noBotPerms } = require("../utils/errors");

exports.run = async (client, message) => {
    let perms = message.guild.me.permissions;
    if (!perms.has("EMBED_LINKS")) return noBotPerms(message, "EMBED_LINKS");

    const infoEmbed = new RichEmbed()
        .setTitle(client.user.username)
        .setDescription("Helps with raids!")
        .setColor(embedColor)
        .addField("Bot Author", `<@${owner}>`)
        .addField("Bot Version", version);

    message.channel.send(infoEmbed);
};

exports.help = {
    name: "info",
    aliases: ["botinfo"],
    description: "View bot information.",
    usage: "info"
};
