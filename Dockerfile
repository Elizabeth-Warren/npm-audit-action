FROM node:12-alpine

LABEL "com.github.actions.name"="npm audit action"
LABEL "com.github.actions.description"="Run `npm audit` on every pull requet"
LABEL "com.github.actions.icon"="crosshair"
LABEL "com.github.actions.color"="red"

COPY audit.js ./audit.js

RUN npm install actions-toolkit

CMD ["node", "./audit.js"]
