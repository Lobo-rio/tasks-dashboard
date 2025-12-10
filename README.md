# Tasks Dashboard

Sistema de gerenciamento de tarefas, squads e usuários desenvolvido com React, Electron e NestJS.

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 📋 Sobre o Projeto

Tasks Dashboard é uma aplicação desktop completa para gerenciamento de projetos, permitindo organizar usuários, squads (equipes) e tarefas de forma eficiente e intuitiva.

### ✨ Principais Funcionalidades

- 📊 **Dashboard Interativo** - Visualização em tempo real com gráficos de pizza e barras
- 👥 **Gerenciamento de Usuários** - CRUD completo com validação de email
- 🏢 **Gerenciamento de Squads** - Criação e organização de equipes
- ✅ **Gerenciamento de Tarefas** - Sistema completo com status, prioridades e atribuições
- 🔍 **Busca em Tempo Real** - Pesquisa com debounce em todas as listagens
- 📄 **Paginação** - Navegação eficiente com seletor de itens por página
- 📝 **Editor de Texto Rico** - React Quill para descrições formatadas
- 🎨 **Temas Personalizáveis** - Modo claro/escuro com 5 paletas de cores
- 🔔 **Notificações Elegantes** - Toast notifications com react-hot-toast
- 💾 **Persistência de Dados** - Integração com backend PostgreSQL

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18.3.1** - Biblioteca JavaScript para interfaces
- **Vite 5.4.11** - Build tool e dev server
- **Electron** - Framework para aplicações desktop
- **React Router DOM 7.1.1** - Roteamento
- **Tailwind CSS 3.4.17** - Framework CSS utilitário
- **Recharts 2.15.0** - Biblioteca de gráficos
- **React Quill 2.0.0** - Editor de texto rico
- **React Hot Toast 2.4.1** - Sistema de notificações
- **Lucide React 0.469.0** - Ícones

### Backend (Repositório Separado)
- **NestJS 9.4.3** - Framework Node.js
- **TypeORM** - ORM para PostgreSQL
- **PostgreSQL 15** - Banco de dados
- **Docker Compose** - Containerização do banco
- **Class Validator** - Validação de dados

## 📁 Estrutura do Projeto

```
tasks-dashboard/
├── electron/              # Configuração do Electron
│   ├── main.cjs          # Processo principal
│   └── preload.cjs       # Script de preload (IPC)
├── src/
│   ├── components/       # Componentes reutilizáveis
│   │   ├── ErrorBoundary.jsx
│   │   ├── Layout.jsx
│   │   ├── Pagination.jsx
│   │   ├── RichTextEditor.jsx
│   │   └── SearchBar.jsx
│   ├── contexts/         # Context API
│   │   └── ThemeContext.jsx
│   ├── features/         # Módulos de funcionalidades
│   │   ├── users/
│   │   │   ├── UserList.jsx
│   │   │   └── UserForm.jsx
│   │   ├── squads/
│   │   │   ├── SquadList.jsx
│   │   │   └── SquadForm.jsx
│   │   └── tasks/
│   │       ├── TaskList.jsx
│   │       └── TaskForm.jsx
│   ├── routes/           # Páginas/Rotas
│   │   ├── Dashboard.jsx
│   │   ├── SettingsPage.jsx
│   │   ├── UsersPage.jsx
│   │   ├── SquadsPage.jsx
│   │   └── TasksPage.jsx
│   ├── services/         # Serviços e APIs
│   │   ├── api.js        # Cliente HTTP para backend
│   │   └── mockApi.js    # API mock (legacy)
│   ├── App.jsx           # Componente raiz
│   ├── main.jsx          # Entry point
│   └── index.css         # Estilos globais
├── package.json
├── vite.config.js
├── tailwind.config.cjs
└── docker-compose.yml    # (Backend)
```

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Docker (para o backend)

### Frontend (Dashboard)

```bash
# Clone o repositório
git clone https://github.com/Lobo-rio/tasks-dashboard.git
cd tasks-dashboard

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Execute a versão de produção
npm run electron
```

### Backend (NestJS)

```bash
# Clone o repositório do backend
cd ../tasks-backend

# Instale as dependências
npm install --legacy-peer-deps

# Inicie o PostgreSQL com Docker
docker-compose up -d

# Execute o backend
npm run start:dev
```

O backend estará disponível em `http://localhost:3000`

## 📡 Rotas da Aplicação

### Frontend (React Router)

| Rota | Componente | Descrição |
|------|-----------|-----------|
| `/` | Dashboard | Página inicial com estatísticas e gráficos |
| `/users` | UsersPage | Listagem e gerenciamento de usuários |
| `/squads` | SquadsPage | Listagem e gerenciamento de squads |
| `/tasks` | TasksPage | Listagem e gerenciamento de tarefas |
| `/settings` | SettingsPage | Configurações de tema e paleta de cores |

### Backend (API REST)

**Base URL:** `http://localhost:3000/api`

#### Usuários

| Método | Endpoint | Descrição | Query Params |
|--------|----------|-----------|--------------|
| GET | `/users` | Lista usuários | `search`, `page`, `limit` |
| GET | `/users/:id` | Busca usuário por ID | - |
| POST | `/users` | Cria novo usuário | - |
| PATCH | `/users/:id` | Atualiza usuário | - |
| DELETE | `/users/:id` | Remove usuário | - |

**Payload de Criação:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com"
}
```

#### Squads

| Método | Endpoint | Descrição | Query Params |
|--------|----------|-----------|--------------|
| GET | `/squads` | Lista squads | `search`, `page`, `limit` |
| GET | `/squads/:id` | Busca squad por ID | - |
| POST | `/squads` | Cria nova squad | - |
| PATCH | `/squads/:id` | Atualiza squad | - |
| DELETE | `/squads/:id` | Remove squad | - |

**Payload de Criação:**
```json
{
  "name": "Team Alpha",
  "description": "<p>Equipe de desenvolvimento frontend</p>"
}
```

#### Tarefas

| Método | Endpoint | Descrição | Query Params |
|--------|----------|-----------|--------------|
| GET | `/tasks` | Lista tarefas | `search`, `page`, `limit` |
| GET | `/tasks/:id` | Busca tarefa por ID | - |
| POST | `/tasks` | Cria nova tarefa | - |
| PATCH | `/tasks/:id` | Atualiza tarefa | - |
| DELETE | `/tasks/:id` | Remove tarefa | - |

**Payload de Criação:**
```json
{
  "title": "Implementar login",
  "description": "<p>Criar tela de autenticação</p>",
  "status": "todo",
  "priority": "high",
  "dueDate": "2024-12-31",
  "userId": "uuid-do-usuario",
  "squadId": "uuid-da-squad"
}
```

**Status disponíveis:** `todo`, `doing`, `done`  
**Prioridades disponíveis:** `low`, `medium`, `high`

#### Paginação

Todas as rotas de listagem suportam:
- `search` - Termo de busca (string)
- `page` - Número da página (default: 1)
- `limit` - Itens por página (default: 5)

**Exemplo de resposta paginada:**
```json
{
  "data": [...],
  "meta": {
    "total": 50,
    "page": 1,
    "limit": 5,
    "totalPages": 10
  }
}
```

## 🎨 Funcionalidades Detalhadas

### Dashboard
- Contadores em tempo real de usuários, squads e tarefas
- Gráfico de pizza mostrando tarefas por status
- Gráfico de barras mostrando tarefas por prioridade
- Links rápidos para gerenciamento

### Gerenciamento de Usuários
- Listagem com busca por nome ou email
- Paginação configurável (5, 10, 25, 50 itens)
- Formulário de criação/edição com validação
- Confirmação de exclusão com toast
- Validação de email único

### Gerenciamento de Squads
- Visualização em cards
- Editor de texto rico para descrições
- Busca por nome ou descrição
- Paginação

### Gerenciamento de Tarefas
- Visualização detalhada com status e prioridade
- Atribuição a usuários e squads
- Data de vencimento
- Editor de texto rico para descrições
- Filtros e busca
- Indicadores visuais de status

### Sistema de Temas
- Modo claro/escuro
- 5 paletas de cores:
  - Default (Indigo/Violet)
  - Ocean (Sky/Cyan)
  - Forest (Green/Lime)
  - Sunset (Orange/Amber)
  - Purple (Purple/Fuchsia)
- Persistência no localStorage

### Busca e Paginação
- Debounce de 500ms na busca
- Navegação entre páginas
- Seletor de itens por página
- Contador de resultados
- Estados de loading

## 🔒 Segurança

- **Helmet** - Headers HTTP seguros
- **CORS** - Configurado para origem específica
- **Validação** - class-validator em todos os inputs
- **Sanitização** - Whitelist de propriedades
- **SQL Injection** - Prevenção via TypeORM

## 🏗️ Arquitetura

### Frontend
- **Component-Based** - Componentes reutilizáveis
- **Context API** - Gerenciamento de estado global (tema)
- **Feature-Based** - Organização por funcionalidade
- **Service Layer** - Abstração de chamadas API

### Backend (Hexagonal)
```
module/
├── domain/          # Entidades e regras de negócio
├── application/     # Casos de uso, DTOs, serviços
└── infrastructure/  # Controllers, repositórios
```

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia Vite + Electron

# Build
npm run build        # Build de produção
npm run preview      # Preview do build

# Electron
npm run electron     # Executa versão Electron

# Linting
npm run lint         # Executa ESLint
```

## 🐳 Docker

O backend utiliza Docker Compose para o PostgreSQL:

```yaml
services:
  postgres:
    image: postgres:15-alpine
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: example_multi_user
      POSTGRES_USER: example_multi_user
      POSTGRES_PASSWORD: example_multi_user_2024
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Autor

**Lobo Rio**
- GitHub: [@Lobo-rio](https://github.com/Lobo-rio)

## 🙏 Agradecimentos

- React Team
- Electron Team
- NestJS Team
- Comunidade Open Source

---

⭐ Se este projeto foi útil para você, considere dar uma estrela!
