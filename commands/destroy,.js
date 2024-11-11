module.exports = {
    name: 'destroy',
    aliases: ['d'],
    run: async (client, message) => {
        client.DisTube.voices.leave(message);
    },
    help : () => {
        console.log(this.aliases);
        return `?${module.exports.name} (?${module.exports.aliases[0]}) - Makes bot leave`
    }
}