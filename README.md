# Introduction

This is a Discord bot boilerplate, written in pure Typescript and includes two fully automated help menus, which you can choose between paginated and categorized menus.

## Serving an API

Create an `api` folder under source directory to serve an API to your localhost, and just start to create your endpoints. Files inside `api` folder will be automatically captured and served to the `localhost`. For instance, a file structure like:

```
api
│   index.get.ts
│
└───users
│   │   create.post.ts
│   │   search.get.ts
│   │   delete.ts
```

will create these endpoints: `localhost:PORT` accepting GET, `localhost:PORT/users/create` accepting POST, `localhost:PORT/users/search` accepting GET and `localhost:PORT/users/delete` accepting all methods.

## Creating a command

Creating a command is quite simple, create your command file under commands folder and export a `data` property and `execute` function. Your command -and options, if exists- will be automatically defined in help menu. You can go and copy the ping command if you need an example.

After you've done writing your command, be sure to export it inside `commands/index` file. This is required, since this is the entry point of your commands.

## Starting bot

You need to rename `.env.example` to `.env` and complete the required fields in order to get the bot work. After you've done configuring your environment variables, you are now ready to run the bot.

On Linux or MacOS:
`yarn dev:darwin`

On Windows:
`yarn dev:win`

If you have no compilation errors, bot will be compiled to `dist` directory and will start up there.

### Passing arguments

You can pass arguments to `yarn dev:<OS>` commands to configure your start options:

| Options | Description                                                                                  |
| ------- | -------------------------------------------------------------------------------------------- |
| Port    | Sets the port that your server will listen. Has no effect if you don't have an API directory |

## Disabling Prettier and ESLint

Create a `.vscode` folder including `settings.json`, and paste these:

```json
{
   "eslint.enable": false
}
```
