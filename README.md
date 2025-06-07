# Cida Boleira Site

> **Cida Boleira Site** é uma plataforma web completa pensada para levar a experiência de encomendas de bolos e doces a um novo patamar. O sistema foi idealizado para que clientes encontrem seus sabores favoritos de forma intuitiva, façam pedidos personalizados e acompanhem cada etapa – da preparação até a entrega. Com uma interface responsiva e moderna, o site integra galeria de produtos, gestão de usuários e pedidos, tudo orquestrado por uma arquitetura leve e escalável. Além de oferecer agilidade no fluxo de compra, o projeto valoriza a segurança e a confiabilidade dos dados, garantindo uma jornada do usuário fluida e agradável.

---

## 🚀 Visão Geral

**Cida Boleira Site** é um projeto web desenvolvido pela **Tech\&Connect**, especializado em soluções digitais inovadoras. Este site oferece aos usuários:

* Navegação por cartões de produtos (bolos, doces).
* Redirecionamento dos clientes para whastapp.
* Registro e acompanhamento de pedidos com integração ao Supabase.
* Galeria de imagens dos produtos.
* Formulário de contato para solicitações diretas e agendamentos.

---

## 📖 Sobre a Tech\&Connect

A **Tech\&Connect** é uma empresa de desenvolvimento web focada em transformar ideias em produtos digitais de alta qualidade. Nossa expertise inclui:

* Desenvolvimento de aplicações web responsivas e escaláveis
* Integração de sistemas e APIs de ponta
* Design centrado no usuário e experiência (UX/UI)
* Suporte e manutenção contínuos

Visite nosso site: [Tech\&Connect](https://techconnect.app.br)

---

## 📑 Sumário

1. [Pré-requisitos](#pré-requisitos)
2. [Instalação](#instalação)
3. [Configuração](#configuração)
4. [Uso](#uso)
5. [Tecnologias Utilizadas](#tecnologias-utilizadas)
6. [Recursos e Funcionalidades](#recursos-e-funcionalidades)
7. [Testes](#testes)
8. [Deploy](#deploy)
9. [Contribuição](#contribuição)
10. [Licença](#licença)
11. [Contato](#contato)

---

## 🔧 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

* [Node.js](https://nodejs.org/) v16+
* [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
* [Git](https://git-scm.com/)

---

## ⚙️ Instalação

```bash
# Clone este repositório
git clone https://github.com/techandconnect/Cida-Boleira.git

# Acesse a pasta do projeto
cd cida-boleira-site

# Instale as dependências
npm install   # ou yarn install
```

---

## 🔌 Configuração

1. Crie um arquivo `.env` na raiz do projeto com as variáveis abaixo (baseado em `.env.example`):

   ```env
   VITE_SUPABASE_URL=https://<seu-projeto>.supabase.co
   VITE_SUPABASE_ANON_KEY=<sua_chave_anônima>
   ```

2. Ajuste outras configurações, se necessário, nos arquivos:

   * `tailwind.config.js`
   * `vite.config.js`
   * `postcss.config.js`
   * `jsconfig.json`

---

## 🏃‍♂️ Uso

```bash
# Iniciar o servidor em modo de desenvolvimento
npm run dev     # ou yarn dev

# Build para produção
npm run build   # ou yarn build

# Pré-visualizar build
npm run preview # ou yarn preview
```

Acesse `http://localhost:3000` (ou porta configurada) no seu navegador.

---

## 🛠 Tecnologias Utilizadas

### 🔧 Tecnologias do Projeto

* **Framework de UI:** React (JSX) e Radix UI
* **Build e Bundler:** Vite
* **Estilização:** Tailwind CSS e animações customizadas com Tailwind Animations
* **Backend e Banco de Dados:** Supabase (Autenticação, Realtime e Storage)
* **Ferramentas de Configuração:** ESLint, PostCSS e jsconfig.json
* **Plataforma de Deploy:** Vercel (configuração automática via `vercel.json`)

### 👩‍💻 Ferramentas e Métodos do Desenvolvedor

* **Hostinger Horizon AI:** para otimização de performance de hosting e escalabilidade automática
* **ChatGPT:** suporte a geração de código, revisão de trechos e sugestões de boas práticas
* **Conhecimento Comum de Estudos:** práticas consolidadas de UX/UI, design responsivo, PWA e acessibilidade web
* **Controle de Versão:** Git e GitHub Flow para organização de branches e pull requests

---

## 📦 Recursos e Funcionalidades

* **Produtos:**

  * Listagem de bolos, doces e salgados
  * Galeria de imagens configurável.

* **Pedidos:**

  * Atualização de status (em produção, entregue etc.)
  * Persistência de dados no Supabase

* **Contatos:**

  * Formulário para mensagens diretas
* **Páginas estáticas:**

  * Home, Sobre, Serviços, Galeria, Pedidos, Contato

---

## ✅ Testes

No momento, não há testes automatizados configurados. Sinta-se à vontade para adicionar:

```bash
# Exemplo de comando para testes (a configurar)
npm run test    # ou yarn test
```

---

## 🚀 Deploy

Este projeto pode ser implantado em serviços como **Vercel**. O arquivo `vercel.json` já está configurado para deploy automático.

Exemplo com Vercel CLI:

```bash
vercel --prod
```

---

## 🤝 Contribuição

Contribuições são bem-vindas! Para colaborar:

1. Fork este repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nome-da-feature`)
3. Faça commit das suas alterações (`git commit -m 'Add nova funcionalidade'`)
4. Envie para o repositório original (`git push origin feature/nome-da-feature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE.txt](LICENSE.txt) para detalhes.

---

## 📞 Contato

* **Tech\&Connect**
* Site: [https://techconnect.app.br](https://techconnect.app.br)
* Email: [techconnectbranch@gmail.com](mailto:techconnectbranch@gmail.com)

