# top1bot

>_Winner winner chicken dinner_

Discord bot that can register a user and keep track of his last Warzone victory by saving it in a JSON file.

Useless therefore essential.

## TODO
* [ ] Handle messages / replies
* [ ] Admin commands
* [ ] Debounce / Queue write requests
* [ ] Max queue size
* [ ] Docs with command list

## DB structure

```typescript
"users": {
  "discord_id": {
    "name": string
    "tops": ["date1", "date2"...]
  }
}
```

## Ideas

- If user submits more than 1 top1 in a 20 minute span, ignore request
- Stats ? nb top1 per day / week / month / year ?