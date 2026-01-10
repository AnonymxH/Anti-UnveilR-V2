import "dotenv/config"

import * as fs from "node:fs"
import {
    Client,
    GatewayIntentBits,
    REST,
    Routes,
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    AttachmentBuilder,
    ComponentType,
    MessageFlags,
    Events,
} from "discord.js"
import { ThrottledQueue } from "./src/Services/ThrottledQueue.ts"
import { ProcessFile, QueueCooldown } from "./src/Utils/ProcessFile.ts"

const Throttler = new ThrottledQueue(QueueCooldown)

const DiscordClient = new Client({ intents: [GatewayIntentBits.Guilds] })

const Commands = [
    new SlashCommandBuilder()
        .setName("safe_obfuscate")
        .setDescription("Securely obfuscate your Lua script with Prometheus (bypass the UnveilR V2 deobfuscation)")
        .addAttachmentOption((Option) => Option.setName("file").setDescription("The script file").setRequired(true)),
].map((Command) => Command.toJSON())

const Rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN!)

DiscordClient.once(Events.ClientReady, async () => {
    try {
        await Rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID!, process.env.GUILD_ID!), {
            body: Commands,
        })
        console.log("Client ready!")
    } catch (Error) {
        console.error(Error)
        process.exit(1)
    }
})

DiscordClient.on(Events.InteractionCreate, async (Interaction) => {
    if (!Interaction.isChatInputCommand() || Interaction.commandName !== "safe_obfuscate") return

    const Attachment = Interaction.options.getAttachment("file")!

    try {
        await Interaction.reply({
            content: "⏳ In queue",
            components: [],
            flags: MessageFlags.Ephemeral,
        })

        try {
            const FinalFile = await Throttler.Enqueue(async () => {
                await Interaction.editReply({
                    content: "⏳ Interacting with Prometheus obfuscation...",
                })
                return await ProcessFile(Attachment.url, Attachment.name)
            })

            await Interaction.editReply({
                content: "✅ Obfuscation complete.",
                files: [FinalFile],
            })
        } catch (ProcessError: any) {
            await Interaction.editReply({
                content: `❌ Error: ${ProcessError.message?.slice(0, 200)}`,
            })
        }
    } catch {
        await Interaction.editReply({ content: "⏱️ Interaction timed out.", components: [] })
    }
})

DiscordClient.login(process.env.DISCORD_TOKEN)
