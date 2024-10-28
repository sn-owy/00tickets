import type { ApplicationCommandOptionData, PermissionsBitField } from 'discord.js';

export default interface Command {
  name: string;
  description: string;
  permissions?: string;
  options?: ApplicationCommandOptionData[]; 
  defaultMemberPermissions?: PermissionsBitField | null;
  execute: (client: any, interaction: any) => Promise<void>; 
}
