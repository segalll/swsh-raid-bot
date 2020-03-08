const { removeRaidMember, shiftOverflow, removeFromOverflow, updateRaidMessage } = require("../utils/raidfuncs.js");

module.exports = async (client, reaction, user) => {
    if (reaction.emoji.name != "✅") return;
    if (!client.raids.get(reaction.message.id)) return;
    if (client.raids.get(reaction.message.id).people[0] == user.id) return;
    if (client.raids.get(reaction.message.id).people.includes(user.id)) {
        await removeRaidMember(client, reaction.message.id, user.id);
        if (client.raids.get(reaction.message.id).overflow.length > 0) {
            await shiftOverflow(client, reaction.message.id);
        }
    } else if (client.raids.get(reaction.message.id).overflow.includes(user.id)) {
        removeFromOverflow(client, reaction.message.id, user.id);
    } else {
        return;
    }
    await updateRaidMessage(reaction.message, client.raids.get(reaction.message.id));
};
