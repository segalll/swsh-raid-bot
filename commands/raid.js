exports.run = async (client, message, args) => {
    if (!message.guild.me.permissions.has("ADMINISTRATOR")) {
        return message.channel.send("An admin must give me administrator before you can do this.");
    }

    await message.delete();

    let cmdUsage = client.commands.get("raid", "help.usage");
    let setfcUsage = client.commands.get("setfc", "help.usage");
    let raidChannelUsage = client.commands.get("raidchannel", "help.usage");

    if (!client.botGuilds.get(message.guild.id).raidChannel) {
        return message
            .reply(`an admin must set the raid channel with \`${client.prefix + raidChannelUsage}\` first before you can do this.`)
            .then(msg => msg.delete(5000))
            .catch(err => client.logger.error(err));
    }

    if (!client.userCodes.get(message.author.id)) {
        return message
            .reply(`you must set your friend code with \`${client.prefix + setfcUsage}\` first before you can do this.`)
            .then(msg => msg.delete(5000))
            .catch(err => client.logger.error(err));
    }

    if (client.userRaids.get(message.author.id)) {
        return message
            .reply("you already have a raid!")
            .then(msg => msg.delete(5000))
            .catch(err => client.logger.error(err));
    }

    args = args.join(" ").split('"');
    args.shift();
    if (args.length != 2) {
        return message
            .reply(`usage: \`${client.prefix + cmdUsage}\``)
            .then(msg => msg.delete(5000))
            .catch(err => client.logger.error(err));
    }

    if (args[0].includes("people")) {
        return message
            .reply("sorry, you cannot use the word `people` in raid titles.")
            .then(msg => msg.delete(5000))
            .catch(err => client.logger.error(err));
    }

    if (args[0].includes("/")) {
        return message
            .reply("sorry, you cannot use the character `/` in raid titles.")
            .then(msg => msg.delete(5000))
            .catch(err => client.logger.error(err));
    }

    args[1] = args[1].replace(/ /g, "");

    if (args[1].length != 4 || !/^\d+$/.test(args[1])) {
        return message
            .reply("invalid code.")
            .then(msg => msg.delete(5000))
            .catch(err => client.logger.error(err));
    }
    let raidMessage = await client.channels.get(client.botGuilds.get(message.guild.id).raidChannel).send({
        embed: {
            description: args[0] + " (1/4 people) (0 overflow)",
            color: 6675891,
            author: {
                name: message.author.username,
                icon_url: message.author.avatarURL
            }
        }
    });
    await raidMessage.react("✅");
    let raidChannel;
    if (!client.botGuilds.get(message.guild.id).category) {
        raidChannel = await message.guild.createChannel(args[0], {
            type: "text",
            permissionOverwrites: [
                {
                    id: message.guild.id,
                    deny: ["VIEW_CHANNEL"]
                },
                {
                    id: message.author.id,
                    allow: ["VIEW_CHANNEL"]
                }
            ]
        });
    } else {
        raidChannel = await message.guild.createChannel(args[0], {
            type: "text",
            parent: client.botGuilds.get(message.guild.id).category,
            permissionOverwrites: [
                {
                    id: message.guild.id,
                    deny: ["VIEW_CHANNEL"]
                },
                {
                    id: message.author.id,
                    allow: ["VIEW_CHANNEL"]
                }
            ]
        });
    }
    await raidChannel.send(message.author + ", this is your raid channel.");
    client.raids.set(raidMessage.id, { people: [message.author.id], code: args[1], overflow: [], channel: raidChannel.id, guild: message.guild.id });
    client.userRaids.set(message.author.id, raidMessage.id);
    client.guildRaids.push(message.guild.id, raidMessage.id);
};

exports.help = {
    name: "raid",
    aliases: [],
    description: "Create a raid!",
    usage: 'raid "<name of raid>" <raid code>'
};
