# Folha Bet365 - Frontend (Admin)

Este é o repositório frontend da plataforma administrativa **Folha Bet365**, focado em gerenciamento de operações, usuários e máquinas. Foi construído visando alta performance, segurança e uma excelente experiência de usuário.

## 🚀 Tecnologias e Stack

A aplicação foi desenvolvida utilizando as ferramentas mais modernas do ecossistema front-end:

- **Core**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool / Bundler**: [Vite](https://vitejs.dev/) (Rápido e otimizado)
- **Roteamento**: [React Router v6](https://reactrouter.com/)
- **Estilização e UI**:
  - [Tailwind CSS](https://tailwindcss.com/) (Estilização via classes utilitárias)
  - [shadcn/ui](https://ui.shadcn.com/) (Componentes acessíveis com Radix UI)
  - Ícones via [Lucide React](https://lucide.dev/)
- **Gerenciamento de Estado e Fetching**: [TanStack Query (React Query)](https://tanstack.com/query/latest) + [Axios](https://axios-http.com/)
- **Formulários e Validação**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

---

## 📂 Arquitetura (Feature-Sliced Design Inspirada)

A estrutura do projeto visa a escalabilidade através de módulos coesos e desacoplados:

```text
src/
├── components/   # Componentes globais da interface
│   ├── layout/   # Layouts estruturais (ex: AppSidebar, AppLayout)
│   └── ui/       # Componentes base do shadcn/ui (Button, Input, Sidebar, etc)
├── contexts/     # Context API globais (ex: AuthContext)
├── features/     # Módulos de negócio divididos por funcionalidade (FSD)
│   └── auth/     # Tudo relacionado a autenticação (hooks, schemas, components)
├── lib/          # Configurações de bibliotecas terceiras (axios, zod_env, etc)
├── pages/        # Telas completas roteáveis (Sufixo: *Page.tsx)
├── routes/       # Configuração de rotas públicas, privadas e error boundaries
├── services/     # Comunicação com a API separada da camada de UI
├── types/        # Tipagens TypeScript globais
└── utils/        # Funções utilitárias (ex: localStorage managers)
```

---

## 🧩 Padrões de Projeto (Design Patterns)

O front-end utiliza padrões modernos focados em componentização, reatividade e manutenção a longo prazo:

- **Feature-Sliced Design (FSD) (Inspirado):** Padrão arquitetural que divide o projeto focado nas "Features" de negócios em vez de apenas tipos técnicos. Promove alta coesão e baixo acoplamento, limitando os acessos externos (através do Public API `index.ts`).
- **Provider Pattern:** Utilizado massivamente para o compartilhamento de contexto isolado através do _React Context API_ de maneira limpa (ex: `AuthProvider`, `SidebarProvider`, `TooltipProvider`).
- **Hook Pattern:** O comportamento lógico, fetch de dados e regras de negócio são extraídos dos componentes visuais para dentro de Custom Hooks, tornando as interfaces puramente focadas em exibição (ex: `useAuth`).
- **Component Layout Pattern:** Uso de invólucros arquiteturais (`AppLayout`, `PrivateRoute`) e abstração do componente filho via `children` para injetar a renderização de páginas roteáveis dentro da estrutura mestre.
- **Composition / Atomic Design:** Adotado fortemente pelos componentes providenciados via `shadcn/ui`. Os blocos visuais primários não acoplam comportamentos além do seu escopo, permitindo compor telas complexas como se fossem blocos de Lego.

---

## ✨ Boas Práticas

A aplicação emprega condutas sólidas para garantir sua robustez em produção e facilidade para a equipe:

- **Type Safety End-to-End & Validação Runtime:** Uso implacável de TypeScript combinado com o `Zod` nas fronteiras do App (Formulários de Login, inputs e tipagem de retornos de API). O que o Typescript resolve em tempo de build, o Zod blinda em tempo de execução.
- **Graceful Degradation e Error Boundaries:** Interceptação robusta de falhas em níveis de roteamento (`errorElement`) com páginas personalizadas contra crash (`ErrorPage`), prevenindo a exposição do código da aplicação ao usuário final.
- **Performance de Renderização:** Combate intencional a re-renderizações em cascata, como a substituição de sincronizações maliciosas de `useEffect` por _Lazy State Initializers_ nativos no fluxo de autenticação local.
- **Interceptor-Based Security:** Tokens e validações são abstraídos invisivelmente na camada de rede (axios). Retornos de `401 Unauthorized` ou `403 Forbidden` disparam `CustomEvents` nativos pelo DOM alertando as camadas superiores a encerrar as sessões imediatamente de forma fluida.
- **Acessibilidade Elevada (a11y):** Os blocos primários (`Radix UI` contidos no `shadcn`) aderem perfeitamente aos padrões WAI-ARIA, o que garante compatibilidade imediata com Leitores de Tela e navegação limpa exclusivamente via Teclado.
- **Single Source of Truth para Estilos:** Utilização exclusiva do framework utilitário global através da funcão `cn()` (Tailwind Merge + clsx) que evita colisões de especificidade do CSS nos seus componentes reutilizáveis.

---

## 🛠️ Como Executar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/en/) (Versão 18+)
- NPM ou Yarn

### Passo a Passo

1. Instale as dependências:

```bash
npm install
```

2. Configure as Variáveis de Ambiente:

- Crie um arquivo `.env` na raiz do projeto (ou copie o `.env.example`, se houver).
- Adicione a URL base da API:

```env
VITE_API_BASE_URL="http://localhost:3000/api/v1"
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Acesse no navegador:
   `http://localhost:5173`

---

## 📜 Scripts Disponíveis

No diretório do projeto, você pode rodar:

- `npm run dev`: Roda o app em modo de desenvolvimento.
- `npm run build`: Compila a aplicação para produção (gera a pasta `/dist`).
- `npm run preview`: Inicia um servidor local para testar a versão de produção gerada.
- `npm run lint`: Roda o ESLint para encontrar problemas no código.
- `npm run typecheck`: Valida as tipagens do TypeScript em todo o projeto.

---

## 🛡️ Segurança e Fluxo de Autenticação

- O projeto utiliza uma **Arquitetura de Segurança baseada em interceptors**.
- Tokens JWT são injetados de forma transparente via Axios.
- Rotas protegidas (via `PrivateRoute`) bloqueiam acesso indevido e gerenciam redirecionamentos automáticos via `React Router`.
- Se a API retornar um erro `401 Unauthorized` ou `403 Forbidden`, o sistema invalida ativamente a sessão através do disparo de um evento (`AUTH_EXPIRED_EVENT`), expulsando o usuário de forma limpa e segura de volta para a tela de Login.
