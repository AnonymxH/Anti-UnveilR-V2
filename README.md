# Anti-UnveilR-V2

A mirror for my local project.

This is an obfuscation bot built for **educational purposes only**. Uses the amazing [Prometheus](https://github.com/prometheus-lua/Prometheus) obfuscator.

> [!IMPORTANT]
> Detection templates are required to protect against deobfuscation.
>
> You need to fill the `src/Templates` folder with your own detection template `.luau` files. I do not provide any detections, which prevents them from being patched within minutes.
> 
> The following built-in macros are supported within the template:
>
> - `SCRIPT_SOURCE()`: The source code of the script.
> - `RANDOM_VARIABLE_NAME`: A valid random variable name (32-64 characters), **immutable** within the script context.

To use:

1. Create and configure a `.env` file with your `DISCORD_TOKEN`, `CLIENT_ID`, `GUILD_ID`
2. Run `npm install`
3. Run `npm run start`

Some other tools you might need to install for better usage:

1. **LuaJIT**: Run Prometheus locally, saving WeAreDevs server resources and speeding up the obfuscation process.
2. **Darklua**: Convert some Luau syntax to Lua syntax for compatibility with Prometheus.
