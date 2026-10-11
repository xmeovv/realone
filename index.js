import 'dotenv/config';
import {
  Client, GatewayIntentBits, Events, MessageFlags,
  ActionRowBuilder, ButtonBuilder, ButtonStyle,
} from 'discord.js';

// ---- config ----
const RAID_MESSAGE =
  '## @everyone EASY RAID NIGGAS NIGGA NIGGA JOIN https://discord.gg/BdgWQ4pGaq ##';

const RAID_COUNT = 20; // how many times the button spams. bump it if you want.
// ----------------

const MENTIONS = { parse: ['everyone', 'roles', 'users'] };

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, c => console.log(`Online as ${c.user.tag}`));

client.on(Events.InteractionCreate, async interaction => {
  try {
    if (interaction.isChatInputCommand() && interaction.commandName === 'raid') {
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId('raid_button')
          .setLabel('raid')
          .setStyle(ButtonStyle.Primary)
      );

      return interaction.reply({
        content: 'start raid?',
        components: [row],
        flags: MessageFlags.Ephemeral,
      });
    }

    if (interaction.isButton() && interaction.customId === 'raid_button') {
      await interaction.reply({ content: RAID_MESSAGE, allowedMentions: MENTIONS });
      for (let i = 1; i < RAID_COUNT; i++) {
        await interaction.followUp({ content: RAID_MESSAGE, allowedMentions: MENTIONS });
      }
    }
  } catch (err) {
    console.error(err);
  }
});

client.login(process.env.DISCORD_TOKEN);