module.exports = {
	name: 'jump',
	aliases: ['j'],
	inVoiceChannel: true,
	run: async (client, message, args) => {
        try {
            const queue = client.DisTube.getQueue(message);
            console.log(args[0])
            let jumpNum = parseInt(args[0])
            if (jumpNum > queue.songs.length) {
                return message.channel.send(`${client.emotes.error} | Song doesn't exist`);

            }
            if (isNaN(jumpNum)){
                return message.channel.send(`${client.emotes.error} | Invalid number`);
            } else {
                client.DisTube.jump(message, jumpNum - 1);
                return message.channel.send(`${client.emotes.success} | Jumped to #${jumpNum} in queue!`);
            }
        } catch(err) {
            message.channel.send(`${client.emotes.error} | Error`);
        }

	},
    help : () => {
        return `?${module.exports.name} (?${module.exports.aliases[0]}) - Jump to song in queue Ex. \"?${module.exports.name} 10\" | Immediately jumps to #10 song and skips current song`
    }
}