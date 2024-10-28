import { 
  ApplicationCommandOptionType, 
  ChannelType, 
  TextChannel,
  CommandInteraction, 
  EmbedBuilder, 
  PermissionsBitField 
} from 'discord.js';
import type Command from '../interfaces/command';

const setupCommand: Command = {
  name: 'setup',
  description: 'Sets up the ticket system.', 
  options: [
    {
      name: 'channel',
      description: 'The channel where tickets will be created.',
      type: ApplicationCommandOptionType.Channel,
      required: true,
      channelTypes: [ChannelType.GuildText],
    }
  ], 
  defaultMemberPermissions: new PermissionsBitField(PermissionsBitField.Flags.Administrator), 
  execute: async (client, interaction: CommandInteraction) => {
    if (!interaction.isChatInputCommand()) return; 
    const channel = interaction.options.getChannel('channel');
    if (!channel || !(channel instanceof TextChannel)) {
      await interaction.reply({ content: 'The selected channel is not valid!', ephemeral: true });
      return; 
    }
    const embed = new EmbedBuilder()
    .setColor(0xCBA6F7) 
    .setTitle(`Latency is ${interaction.client.ws.ping}ms`)
    try {
    await channel.send({ embeds: [embed] });
    await interaction.reply({ content: `Ticket system has been set up in <#${channel.id}>`, ephemeral: true });
  } catch (error) {
    console.error('Error sending message:', error);
    await interaction.reply({ content: 'There was an error setting up the ticket system. Please check my permissions!', ephemeral: true });
  }
  }
};

export default setupCommand;
