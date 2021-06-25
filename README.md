# top1bot

>_Winner winner chicken dinner_

Discord bot that can keep track of a user's Warzone victory (~top1) by saving it in a database.

Useless therefore essential.

## Docs
You can find a list of available commands [here](./DOCS.md).

## TODO
* [x] The bot lives
* [x] Register channels
* [x] Register user's top1
* [x] Only listen to channels saved in db
* [x] Admin commands
* [x] Handle messages / replies
* [x] Docs with command list
* [ ] Load registered channels at startup instead of checking everytime
* [ ] Refacto using command loader / handler
* [ ] i18

## Ideas

* [x] If user submits more than 1 top1 in a 15 minute span, ignore request
* [ ] Stats ? nb top1 per day / week / month / year ?
  * [ ] command: `last <day, week, month, year, 5 -> last 5 top1>`
* [x] Only Admin can register channels