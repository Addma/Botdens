module.exports = {
    name: 'togglelogs',
    inVoiceChannel: true,
    run: async (client, message, args) => {
        client.logsOn = !client.logsOn;
        const msg = client.logsOn ? 'on' : 'off';
        message.reply(`Deadlogs are now ` + msg);
    }
}