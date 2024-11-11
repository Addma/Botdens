const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
	help : () => {
        return `?${module.exports.name} (?${module.exports.aliases[0]}) - Ping!`
    }
};
