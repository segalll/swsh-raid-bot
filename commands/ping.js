exports.run = async (client, message) => {
    const msg = await message.channel.send("Ping?");
    msg.edit(`Pong! Latency is \`${msg.createdTimestamp - message.createdTimestamp}ms\`. API Latency is \`${Math.round(client.ping)}ms\`.`);
};

exports.help = {
    name: "ping",
    aliases: [],
    description: "View the latency of the bot and API.",
    usage: "ping"
};
