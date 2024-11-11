module.exports = {
	name: 'play',
	aliases: ['p'],
	inVoiceChannel: true,
	run: async (client, message, args) => {
		const string = args.join(' ');
		if (!string) return message.channel.send(`${client.emotes.error} Empty query or link!`);
		if (!message.member.voice.channel) {
			return message.channel.send(`${client.emotes.error} | You must be in a voice channel!`);
		}
		const res = await client.DisTube.play(message.member.voice.channel, string, {
			member: message.member,
			textChannel: message.channel,
			message,
		}).catch(err => {
            message.channel.send(`ERROR PLAYING VIDEO:  ${err.errorCode || err}`);
		});
	},
	help : () => {
        return `?${module.exports.name} {query} (?${module.exports.aliases[0]}) - Plays a song. Ex. \"?${module.exports.name} Michael Jackson - Beat it\"`
    }
};