exports.run = async (client, message) => {
    await message.channel.send({
        embed: {
            title: "Donate to support the developer and the bot!",
            description: "[Donate here](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=QELCBKCA2LNAG&currency_code=USD&source=url) and I will love you forever",
            color: 8764261
        }
    });
};

exports.help = {
    name: "donate",
    aliases: [],
    description: "Please donate :)",
    usage: "donate"
};
