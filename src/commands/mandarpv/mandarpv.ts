import discord from 'discord.js';

module.exports = {
	data: new discord.SlashCommandBuilder()
		.setName('mandarpv')
		.setDescription('Essa vai ter que ir pro fixados do privado do')
        .addStringOption(option => option.setName('mensagem').setDescription('O que será enviado').setRequired(true))
        .addUserOption(option => option.setName('usuario').setDescription('Pro pv de quem').setRequired(true)),
	async execute(interaction: discord.CommandInteraction) {
        const msg = interaction.options.get('mensagem')?.value as string
        const user = interaction.options.get('usuario')?.user as discord.User
        
        await interaction.reply(`Enviando mensagem para ${user.username}...`).then(async () => {
            await user.send(msg)
        })
	},
};