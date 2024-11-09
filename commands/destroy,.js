module.exports = {
    name: 'destroy',
    aliases: ['d'],
    run: async (client, message) => {
        client.DisTube.voices.leave(message);
    }
}