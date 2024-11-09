module.exports = {
	name: 'resume',
	aliases: ['r'],
	inVoiceChannel: true,
	run: (client, message, args) => {

		try {
            const string = args.join(' ');
            let queue = client.DisTube.getQueue(message)
            if (!message.member.voice.channel) {
                return message.channel.send(`${client.emotes.error} | You must be in a voice channel!`);
            }
            if (queue.songs.length < 1) {
                return
            }
            if (!queue.paused) {
                return message.channel.send(`${client.emotes.error} | Not paused!`);
            }
			 client.DisTube.resume(message);
             message.channel.send(`${client.emotes.success} | Resumed!`);

		} catch(err) {
			console.log(err);
			message.channel.send(`${client.emotes.error} | Error!`)
		}
	},
};