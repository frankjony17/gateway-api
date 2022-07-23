FROM registry.devcompany.com.br/base-images/node:lts-company AS build

WORKDIR /app
COPY . /app

RUN npm ci
RUN npm run build

FROM registry.devcompany.com.br/base-images/node:lts-company AS runtime

# Definir o diretório da aplicação.
USER node
WORKDIR /app

# Copiar o resultado do build.
COPY --from=build /app/.env /app/.env
COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules

ENV PORT=8080
EXPOSE 8080

ENTRYPOINT [ "node", "dist/main" ]