# API Cadastro de Máquinas (Projeto Folha Bet365)

API RESTful desenvolvida para o cadastro e listagem de máquinas, contando com sistema de autenticação e gestão de usuários.

## 🚀 Tecnologias Utilizadas

- **Node.js** com **Express**
- **TypeScript**
- **Prisma ORM**
- **MySQL** (via Docker)
- **Zod** (Validação de dados)
- **JWT (JSON Web Token)** & **Bcryptjs** (Segurança e Autenticação)
- **Swagger** (Documentação da API)
- **ESLint & Prettier** (Padronização de código)

---

## 🏗️ Arquitetura

O projeto utiliza uma **Arquitetura Modular baseada em Camadas**, visando separação de responsabilidades, escalabilidade e facilidade de manutenção. 

A estrutura de pastas principal (`src/`) do projeto é organizada da seguinte forma:

```text
src/
├── config/           # Configurações do Zod para variáveis de ambiente e Swagger
├── lib/              # Instância do banco (Prisma Client)
├── middlewares/      # Tratamento global de erros, autenticação JWT e validação Zod
├── modules/
│   ├── auth/         # Módulo responsável por login e geração de tokens
│   ├── machines/     # Módulo de cadastro e listagem de máquinas
│   └── users/        # Módulo de CRUD completo de usuários
│       ├── controllers/  # Lida com as requisições HTTP (Request/Response)
│       ├── repositories/ # Camada de acesso a dados isolando o banco (Prisma)
│       ├── routes/       # Define os endpoints e mapeia para os controllers
│       ├── schemas/      # Validação de dados de entrada via Zod
│       └── services/     # Regras de Negócio e Casos de Uso
└── utils/            # Utilitários globais (ex: padronização de respostas HTTP)
```

---

## 🧩 Padrões de Projeto (Design Patterns)

O projeto foi construído apoiando-se em padrões de mercado para garantir sua manutenibilidade:

- **Repository Pattern:** Centraliza a lógica de acesso ao banco de dados. Qualquer operação no banco passa pelo repositório, o que isola o ORM (Prisma) do restante da aplicação.
- **Service Pattern (Use Cases):** As regras de negócio são isoladas nos *Services*, garantindo que os *Controllers* fiquem limpos e apenas gerenciem o fluxo HTTP.
- **Dependency Inversion (Inversão de Dependência):** A aplicação favorece a injeção de dependências (como repositórios sendo injetados nos serviços), reduzindo o acoplamento entre os componentes.
- **Controller Pattern:** Atuam como orquestradores das requisições HTTP, recebendo o payload da rota, acionando o Service correto e devolvendo a resposta formatada ao cliente.
- **DTO Pattern (Data Transfer Object):** Utilização indireta através dos *Schemas* do Zod, definindo estritamente os contratos de entrada e saída de dados.

---
## ✨ Boas Práticas

- **Segurança (JWT & Bcrypt):** Senhas armazenadas com hash forte (bcrypt) e rotas sensíveis protegidas por JSON Web Token.
- **Validação de Dados:** Utilização do `Zod` para garantir que os dados recebidos na API estejam no formato correto antes de qualquer processamento.
- **Tratamento de Erros:** Middleware centralizado para captura e formatação padronizada de erros, evitando vazamento de informações sensíveis e retornando respostas HTTP adequadas.
- **Documentação Interativa:** Uso do Swagger (`swagger-jsdoc` e `swagger-ui-express`) para documentação viva e interativa dos endpoints.
- **Tipagem Estrita:** Uso intensivo do TypeScript para prevenir erros em tempo de desenvolvimento.
- **Isolamento de Banco de Dados local:** Utilização do `docker-compose` para subir rapidamente uma instância do MySQL sem poluir o ambiente da máquina host.
- **Versionamento de API:** As rotas são prefixadas com `/api/v1/` para facilitar futuras evoluções da API sem quebrar integrações existentes.
- **Padronização de Código:** Configuração do `ESLint` e `Prettier` garantindo que o estilo de código seja mantido.

---

## ⚙️ Funcionalidades

- **Autenticação:** Login seguro com verificação de hash e geração de token JWT.
- **Gestão de Usuários:** CRUD completo para gerenciamento de contas de administradores.
- **Cadastro de Máquinas:** Permite a criação de novos registros de máquinas.
- **Listagem de Máquinas:** Recuperação dos dados de máquinas salvas (protegida via JWT).
- **Health Check:** Endpoint `/health` para verificação de disponibilidade da API.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/en/) (v20+ recomendado)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)

### Passos para rodar localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/lanjosdev/projeto-folha-bet365.git
   cd projeto-folha-bet365
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. **Inicie o Banco de Dados com Docker:**
   ```bash
   docker-compose up -d
   ```

5. **Gere os artefatos do Prisma, rode as migrações e popule o banco (Seed):**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```
   > 💡 **Nota:** O comando `seed` criará automaticamente o usuário administrador padrão para o seu primeiro acesso:
   > - **E-mail:** `admin@admin.com`
   > - **Senha:** `admin123`

6. **Inicie o servidor em modo de desenvolvimento:**
   ```bash
   npm run dev
   ```

A API estará rodando em `http://localhost:3000`.

### 📚 Documentação da API

Após rodar o projeto, a documentação interativa gerada pelo **Swagger** poderá ser acessada em:
👉 **[http://localhost:3000/docs](http://localhost:3000/docs)**
