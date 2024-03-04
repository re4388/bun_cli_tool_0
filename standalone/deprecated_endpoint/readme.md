# GOAL
- 方便讓我查看 API 呼叫次數

# 內容
- 此程式包括兩個 檔案
- 一個檔案(syncEndpointGoogleSheet.ts)用來 sync googleSheet 資料 
- 和一個檔案, 可以用直接 bun run 來跑起來，就可以利用 fzf 查看資料(deprecated_endpoint.ts)
- syncEndpointGoogleSheet 可以每一個月，或是要用的時候，跑一次， sync 一下遠端的資料
- 目前遠端的資料，是我 copy 正式資料到另一個檔案上，因此每一個月可能要替換 google sheet 的id
  - [Hermes Endpoint Deprecation Insight 的副本 - Google 試算表](https://docs.google.com/spreadsheets/d/19N5k1kAVBtYPo06QFkP4i1ZFzWj0YLzOnW6ohUDWO1w/edit#gid=1606999839)
  - 就是替換這個到 code 裡面 `19N5k1kAVBtYPo06QFkP4i1ZFzWj0YLzOnW6ohUDWO1w`


# sync SOP
- 複製一個新的 Hermes Endpoint Deprecation Insight
- 砍掉舊的
- get new id, replace it intp this line
```ts
Google_DOC_ID = '19N5k1kAVBtYPo06QFkP4i1ZFzWj0YLzOnW6ohUDWO1w';
```

```shell
bun run /Users/re4388/project/personal/lang/bun/bun_cli_0/scripts/deprecated_endpoint/syncEndpointGoogleSheet.ts
```
- 最後就可以呼叫 deprecated_endpoint.ts 來查看資料
