const { addToOverflow, addRaidMember, updateRaidMessage } = require("../utils/raidfuncs.js");

module.exports = async (client, reaction, user) => {
    if (user.bot) return;
    if (reaction.emoji.name != "✅") return;
    if (!client.raids.get(reaction.message.id)) return;
    if (client.userRaids.get(user.id)) return;
    if (client.raids.get(reaction.message.id).people.includes(user.id)) return;
    if (client.raids.get(reaction.message.id).people.length == 4) {
        addToOverflow(client, reaction.message.id, user.id);
    } else {
        await addRaidMember(client, reaction.message.id, user.id);
    }
    await updateRaidMessage(reaction.message, client.raids.get(reaction.message.id));
};
