# ---- Estágio 1: Build ----
# Use a imagem Node.js 18 Alpine como base (consistente com o log anterior e bom para produção)
FROM node:18-alpine AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia package.json e package-lock.json (ou yarn.lock, pnpm-lock.yaml se usar outros)
# O '*' garante que ambos sejam copiados se existirem
COPY package.json package-lock.json* ./

# Instala todas as dependências (incluindo devDependencies necessárias para o build com tsup)
# 'npm ci' é mais rápido e garante consistência com o lockfile
RUN npm install

# Copia o restante do código fonte (incluindo a pasta 'src' com seu código TypeScript)
COPY . .

# Executa o script de build ('tsup-node' conforme seu package.json)
# Isso deve compilar seu TypeScript para JavaScript, geralmente para uma pasta 'dist'
RUN npm run build

# ---- Estágio 2: Produção ----
# Use a mesma imagem base
FROM node:18-alpine

WORKDIR /app

# Copia package.json e package-lock.json do estágio de build
COPY --from=builder /app/package.json /app/package-lock.json* ./

# Instala SOMENTE as dependências de produção
RUN npm ci --only=production

# Copia a pasta 'dist' com o código JavaScript compilado (agora .mjs) do estágio de build
# Se 'tsup-node' gerar em outro diretório, ajuste '/app/dist'
COPY --from=builder /app/dist ./dist

# Expõe a porta interna que sua aplicação (Fastify) vai escutar.
# Lembre-se: Sua aplicação DEVE usar process.env.PORT fornecido pelo Railway.
# 3000 é um valor comum, mas o Railway vai sobrescrever via variável de ambiente.
EXPOSE 3000

# Comando para iniciar a aplicação em produção, apontando para o arquivo .mjs
CMD ["node", "dist/server.mjs"]