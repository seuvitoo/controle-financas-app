
# Controle Financeiro

Este é um projeto para controle financeiro pessoal, permitindo o gerenciamento de rendas, transações (receitas, despesas e investimentos) e categorias. O sistema foi desenvolvido com foco em escalabilidade e boas práticas de programação.

## Requisitos Básicos

- **Node.js** (versão 14 ou superior)
- **Docker** (para configurar o banco de dados PostgreSQL)
- **PostgreSQL** (utilizado como banco de dados principal)
- **npm** (para gerenciar pacotes do projeto)

## Tecnologias Utilizadas

- **Backend**: Node.js com Express
- **ORM**: TypeORM
- **Banco de Dados**: PostgreSQL (gerenciado via Docker)
- **Autenticação**: JWT (a ser implementado)
- **Arquitetura**: Clean Architecture com princípios de SOLID

## Estrutura do Projeto

O projeto segue a seguinte estrutura de pastas:

```
src/
├── config/          # Configurações do projeto (ex.: banco de dados)
├── controllers/     # Controladores para gerenciar requisições
├── models/          # Modelos do banco de dados (entidades TypeORM)
├── routes/          # Rotas da API
├── services/        # Lógica de negócio e validações
└── utils/           # Funções auxiliares e utilitários
```

## Como Executar o Projeto

1. **Clone o Repositório**
   ```bash
   git clone https://github.com/seu-usuario/controle-financeiro.git
   cd controle-financeiro
   ```

2. **Instale as Dependências**
   ```bash
   npm install
   ```

3. **Configure o Banco de Dados**
   - Certifique-se de que o Docker está instalado e rodando.
   - Inicie o banco de dados PostgreSQL:
     ```bash
     docker-compose up -d
     ```

4. **Inicie o Servidor**
   - Inicialize o servidor:
     ```bash
     npm start
     ```

5. **Testar a Aplicação**
   - A API estará disponível em: `http://localhost:3000`

## Próximos Passos

- Implementar autenticação JWT.
- Criar rotas para gerenciar transações.
- Desenvolver interface frontend.

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

---

**Autor:** Seu Nome  
**Licença:** MIT
