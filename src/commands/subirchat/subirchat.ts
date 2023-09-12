import discord from 'discord.js';

module.exports = {
	data: new discord.SlashCommandBuilder()
		.setName('subirchat')
		.setDescription('Sobe o chat quando enviam uma nuclear')
        .addIntegerOption(option => option.setName('pontos').setDescription('Quantidade de pontinhos')),
	async execute(interaction: discord.CommandInteraction) {
        let param = interaction.options.get('pontos')?.value ? interaction.options.get('pontos')?.value : 30 
        let val = param as number
        
        if (val > 50 || val === 0) {
            val = 30
        }
        
        interaction.reply(`Subindo o chat em ${val} pontos...`).then(async () => {
            var string = ''
            for (var i = 0; i < val; i++) {
                string += '.\n'
            }
            await interaction.channel.send(string)
        })
	},
};