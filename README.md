# Introdução

API REST bancária desenvolvida em **NestJS** com **TypeScript**, projetada para processar operações financeiras entre contas mas podendo ser expandido posteriormente.

O projeto aplica os princípios de **Clean Architecture**, separando domínio, aplicação e infraestrutura em camadas bem definidas, com baixo acoplamento e alta coesão. A persistência é feita via **Prisma ORM** com **SQLite**.



---

## Tecnologias utilizadas

| Tecnologia | Descrição |
|---|---|
| **Node.js 22** | Runtime JavaScript |
| **NestJS 11** | Framework para construção da API |
| **TypeScript** | Superset tipado do JavaScript |
| **Prisma 7** | ORM para acesso ao banco de dados |
| **SQLite** | Banco de dados relacional embutido (via `better-sqlite3`) |
| **Jest** | Framework de testes unitários |
| **Docker** | Containerização da aplicação |
| **ESLint + Prettier** | Lint e formatação de código |

---

## Arquitetura

O projeto segue os princípios de **Clean Architecture**, separando responsabilidades em camadas:

```
src/
├── account/
│   ├── application/   # Casos de uso, serviços, adaptadores, validadores
│   ├── domain/        # Interfaces, entidades, exceções e contratos
│   └── infrastructure/ # Controllers HTTP e repositórios (Prisma)
└── shared/            # Módulos e utilitários compartilhados
```

---

## Decisões estratégicas

Durante repasse do projeto foi comentado sobre garantir atomicidade, portanto implementei principalmente para o cenário de transferências,
o sistema salvar os dados usando transaction no banco de dados, assim garantindo que o débito da conta de origem e o crédito da conta de destino são persistidos atomicamente, ou os dois ocorrem, ou nenhum ocorre.

Uma decisão importante foi em relação à simplicidade, optei por separar bem responsabilidades o que aumenta consequentemente o número de arquivos, porém cada arquivo está conciso e com baixo acoplamento e alta coesão.

Os requisitos do projeto deixaram algumas regras de negócio implícitas, que precisaram ser interpretadas e implementadas:

- **Saldo como valor inteiro** — Ficou de maneira implicita nos requisitos do projeto que seria trabalhado apenas números inteiros, portanto segui com essa visão, mas um refactor para trabalhar com ponto flutuante seria interessante.
- **Criação automática de conta** — os requisitos demonstraram que ao depositar ou transferir para uma conta inexistente deveria ser criada uma nova conta para receber esse saldo. Seguindo essa lógica optei por nesses casos, criar uma conta zerada e então atualizar o dado para ter uma forma de registro, em outros casos eu criaria uma tabela de log e registraria principalmente as transações de cada conta para possível auditoria.

---

## Endpoints

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/reset` | Reseta todas as contas |
| `GET` | `/balance?account_id={id}` | Retorna o saldo de uma conta |
| `POST` | `/event` | Processa um evento (`deposit`, `withdraw`, `transfer`) |

### Exemplos de payload para `/event`

**Depósito**
```json
{ "type": "deposit", "destination": "100", "amount": 10 }
```

**Saque**
```json
{ "type": "withdraw", "origin": "100", "amount": 5 }
```

**Transferência**
```json
{ "type": "transfer", "origin": "100", "destination": "300", "amount": 15 }
```

---

## Como rodar o projeto

### Pré-requisitos

- [Node.js 22.22.3+](https://nodejs.org/) — caso tenha o [nvm](https://github.com/nvm-sh/nvm) instalado, basta rodar:
  ```bash
  nvm install
  ```
  O arquivo `.nvmrc` já aponta para a versão correta (`v22.22.3`).
- [Docker](https://www.docker.com/) (opcional, para rodar via container)

---

### Rodando localmente (sem Docker)

**1. Copie o .env para o projeto**
```bash
cp .env.example .env
```

**2. Instale as dependências**
```bash
npm install
```

**3. Gere o cliente do Prisma**
```bash
npx prisma generate
```

**4. Execute as migrations do banco de dados**
```bash
npx prisma migrate deploy
```

**5. Inicie a aplicação**
```bash
# Desenvolvimento (com hot-reload)
npm run start:dev

# Produção
npm run start:prod
```

A API estará disponível em `http://localhost:3000`.

---

### Rodando com Docker

**Copie o .env para o projeto**
```bash
cp .env.example .env
```

**Build e start do container:**
```bash
docker-compose up --build
```

O Docker irá automaticamente instalar as dependências, gerar o Prisma Client, executar as migrations e iniciar a aplicação na porta `3000`.

---

## Testes

```bash
# Rodar todos os testes unitários
npm test

# Gerar relatório de cobertura
npm run test:cov

# Rodar todos os testes unitários com docker
docker compose exec api-service npm test

# Gerar relatório de cobertura
docker compose exec api-service npm run test:cov
```

---

## Variáveis de ambiente

| Variável | Padrão | Descrição |
|---|---|---|
| `PORT` | `3000` | Porta em que a aplicação será iniciada |
| `DATABASE_URL` | `file:./prisma/dev.db` | Url padrão para banco local |

