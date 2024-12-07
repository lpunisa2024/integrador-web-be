# Projeto-Integrador-Programa-o-Web - Reclamações Frontend

Projeto Integrador: Programação Web - Disciplina 28130

Este é o frontend do sistema de cadastro de reclamações. Ele foi desenvolvido utilizando **React** com estilização baseada no **Bootstrap**, permitindo aos usuários cadastrarem e visualizarem reclamações.

## Funcionalidades

- Formulário para cadastro de reclamações.
- Tabela dinâmica para exibição das reclamações registradas.
- Comunicação com o backend utilizando Axios.

---

## Requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- **Node.js** (versão 14 ou superior)
- **NPM** (gerenciador de pacotes do Node.js)

---

## Como Executar

Siga os passos abaixo para configurar e executar o frontend:

### 1. Clone o Repositório

Se você ainda não clonou o repositório, faça isso com o comando:
```bash
git clone <URL_DO_REPOSITORIO>
cd integrador-web-frontend
```

### 2. Instale as Dependências

No diretório do frontend, instale as dependências necessárias com o comando:
```bash
npm install
```

### 3. Execute o Servidor de Desenvolvimento

Inicie o servidor de desenvolvimento com o comando:
```bash
npm start
```

O frontend será iniciado e estará disponível em:  
`http://localhost:3000`

---

## Estrutura do Projeto

```
reclamacoes-frontend/
├── src/
│   ├── App.js         # Arquivo principal do React
│   ├── index.js       # Ponto de entrada do React
│   └── ... (outros arquivos)
├── public/
│   ├── index.html     # HTML principal
│   └── ... (outros arquivos)
├── package.json       # Configuração do projeto React
├── node_modules/      # Dependências do projeto
└── ... (outros arquivos e pastas)
```

---

## Tecnologias Utilizadas

- **React.js**: Framework JavaScript para criação de interfaces de usuário.
- **Bootstrap**: Framework CSS para estilização.
- **Axios**: Biblioteca para realizar requisições HTTP.
