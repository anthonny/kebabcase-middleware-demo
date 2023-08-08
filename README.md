# Demo of a serializer to kebabcase

## Install

```
npm install
```

## Start

```
node index.js
```

## Queries

With Kebabcase:

```
curl --request GET \
  --url http://localhost:3000/ \
  --header 'Accept: application/json+kebabcase'
```

With Camelcase:

```
curl --request GET \
  --url http://localhost:3000/
```
