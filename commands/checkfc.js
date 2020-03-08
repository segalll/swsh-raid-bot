exports.run = async (client, message) => {
    if (!client.userCodes.get(message.author.id)) {
        message.author.send("You haven't set your friend code.");
    } else {
        message.author.send(client.userCodes.get(message.author.id));
    }
};

exports.help = {
    name: "checkfc",
    aliases: [],
    description: "Check your friend code.",
    usage: "checkfc"
};
