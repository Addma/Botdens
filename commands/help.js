module.exports = {
	name: 'help',
	aliases: ['h'],
	inVoiceChannel: true,
	run: async (client, message, args) => {
		try {
            let res = ""
			client.commands.forEach(element => {
                let keys = Object.keys(element)
                console.log(element)
                if (keys.includes("help"))
                res+=(element.help() + "\n");            
            });
			return message.channel.send(res);
		}
		catch (err) {
			console.log(err);
			return message.channel.send(`${client.emotes.error} | Error`);
		}

	},
    help : () => {
        return `!${module.exports.name} (!${module.exports.aliases[0]}) - Lists commands and descriptions :D`
    }
};