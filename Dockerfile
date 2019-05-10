FROM node:12-alpine

LABEL "com.github.actions.name"="npm audit action"
LABEL "com.github.actions.description"="Run `npm audit` on every pull requet"
LABEL "com.github.actions.icon"="crosshair"
LABEL "com.github.actions.color"="red"

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of your action's code
COPY . .

# Run `node /index.js`
ENTRYPOINT ["node", "/index.js"]
