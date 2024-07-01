# Controle de Finanças

## Descrição
Este é um projeto de controle de finanças pessoais desenvolvido com Node.js, TypeScript, Express, TypeORM e SQLite. Ele permite que os usuários registrem transações, categorizem despesas e receitas, e obtenham um orçamento mensal com base nas receitas e despesas.

## Tecnologias Utilizadas
- **Node.js**: Ambiente de execução JavaScript server-side.
- **TypeScript**: Superconjunto de JavaScript que adiciona tipagem estática.
- **Express**: Framework web para Node.js.
- **TypeORM**: ORM (Object-Relational Mapping) para TypeScript e JavaScript.
- **SQLite**: Banco de dados SQL leve.
- **Nodemon**: Ferramenta para reiniciar automaticamente o servidor quando o código é alterado.
- **JWT**: JSON Web Token para autenticação.

## Padrões e Estrutura
- **Arquitetura MVC**: Separação de responsabilidades em Models, Views e Controllers.
- **Autenticação JWT**: Uso de JSON Web Tokens para autenticação segura.
- **TypeORM**: Gerenciamento de entidades e migrações de banco de dados.

## Funcionalidades

1. **Cadastro de Usuários**
2. **Autenticação de Usuários**
3. **Criação de Classificações**
4. **Criação de Categorias com Percentuais**
5. **Criação de Flows**
6. **Criação de Transações**
7. **Cálculo do Orçamento Mensal (Rota `/api/budget`)**
    - Total de Receitas
    - Valor Planejado para cada Categoria
    - Gastos Atuais por Categoria
    - Valor Restante por Categoria

## Como Rodar Localmente

### Pré-requisitos
- Node.js instalado
- npm (Node Package Manager) instalado

### Passos

1. **Clone o repositório:**
    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd controle-financas-app
    ```

2. **Instale as dependências:**
    ```bash
    npm install
    ```

3. **Configure o banco de dados:**
    - O banco de dados SQLite será criado automaticamente na primeira execução.

4. **Execute o servidor em modo de desenvolvimento:**
    ```bash
    npm run dev
    ```
    - Isso iniciará o servidor com Nodemon, que reiniciará automaticamente sempre que houver alterações no código.

### Rotas Principais

- **/auth/register** (POST): Registro de novos usuários.
- **/auth/login** (POST): Autenticação de usuários.
- **/api/classificacoes** (GET, POST): Gerenciamento de classificações.
- **/api/categorias** (GET, POST): Gerenciamento de categorias.
- **/api/flows** (GET, POST): Gerenciamento de flows.
- **/api/transactions** (GET, POST): Gerenciamento de transações.
- **/api/budget** (GET): Cálculo do orçamento mensal.

### Exemplo de Requisição para Criar uma Transação

```bash
curl -X POST http://localhost:3000/api/transactions \
-H "Authorization: Bearer <your_jwt_token>" \
-H "Content-Type: application/json" \
-d '{
  "data": "2024-06-30",
  "valor": 500.00,
  "fluxo_id": 2,
  "observacao": "Pagamento de Internet e TV"
}'
```