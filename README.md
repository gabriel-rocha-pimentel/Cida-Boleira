# 🍰 Cida Rocha Boleira - Website

Website institucional completo para a confeiteira **Cida Rocha**, com portfólio de bolos, formulário de contato, painel administrativo com autenticação e gerenciamento de projetos, agendamentos e configurações globais.

## 📚 Visão Geral

* Website público com:

  * Página inicial
  * Sobre
  * Portfólio de bolos
  * Detalhes de cada projeto
  * Contato via WhatsApp

* Painel administrativo com:

  * Login e cadastro via Supabase Auth
  * Dashboard com estatísticas em tempo real
  * Gerenciamento de projetos e imagens
  * Controle de agendamentos de pedidos
  * Atualização de senha e perfil do administrador
  * Configurações globais do site (nome, cidade, redes sociais)

* Backend (dados) gerenciado via Supabase (banco, auth e storage)

---

## 🚀 Tecnologias Utilizadas

### Frontend:

* [React 18+](https://reactjs.org/)
* [Vite](https://vitejs.dev/)
* [React Router DOM](https://reactrouter.com/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Lucide Icons](https://lucide.dev/)
* [Framer Motion](https://www.framer.com/motion/)
* [ShadCN UI](https://ui.shadcn.dev/)

### Backend (BaaS):

* [Supabase](https://supabase.com/)

  * Autenticação de administradores
  * Banco de dados PostgreSQL
  * Armazenamento de imagens

---

## 🧭 Funcionalidades

* Upload de imagens para o portfólio com exibição em carrossel
* Busca e filtro de projetos por tema
* Agendamento de pedidos com campos personalizados
* Painel administrativo com atalhos rápidos
* Proteção de rotas com autenticação persistente
* Toasts e feedbacks visuais de sucesso ou erro

---

## 🛠 Instalação Local

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/cida-boleira.git
cd cida-boleira
```

### 2. Instale as dependências

```bash
yarn install
# ou npm install
```

### 3. Crie o arquivo `.env`

```env
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Inicie o projeto

```bash
yarn dev
```

---

## ⚙️ Acesso ao Painel Admin

* Acesse `/admin/login`
* Realize o login com e-mail e senha válidos (usuário criado via Supabase Auth)
* Somente usuários autorizados terão acesso às funcionalidades administrativas

---

## 🎨 Identidade Visual

* Cores principais: Dourado, Chocolate, Creme
* Tipografia personalizada: Cursiva nos títulos, Sans-serif nos textos
* Estilo elegante com foco em sofisticação e apetite visual

---

## 📍 Contato

> Criado com carinho para a confeiteira Cida Rocha.
> Em cojunto com a Hostinguer Horizon desenvolvido por [Tech\&Connect](https://github.com/gabriel-rocha-pimentel).
