# Hidrômeto (na falta de um nome melhor)

## Requerimentos
- Mysql (Testado com Ver 14.14 Distrib 5.7.18)
- Node (Testado com v7.9.0)
- Git

## Instalação
##### Git
Clone esse repósitorio com esse comando: `git clone git@github.com:peruggia/hidrometro.git`. Isso criará uma pasta e colocará os arquivos lá dentro.

##### Node
Entre na pasta e execute `npm install` que instalará os pacotes necessários. (precisa do node instalado pra fazer isso)

##### Database
Pegue o conteúdo do arquivo `database_script.sql` e execute no seu banco. Um DB chamado `water` será criado junto com duas tabelas e alguns dados simples.

## Executando
No console, vá até a pasta do projeto e execute `node index.js`.
Isso executará o servidor na porta 3000.

**Observe que no arquivo `index.js` tem a configuração do banco, com senha e tudo. Caso a sua configuração seja diferente, apenas altere o arquivo e sucesso.**

## Testando
Para simular a inclusão de uma leitura do Arduino no banco de dados basta chamar a URL: `http://localhost:3000/consumo/45`, onde 45 é a quantidade que deseja inserir.

**obs: só é possível adicionar números inteiros, por enquanto**

Se no final nada der certo e você for religioso(a), reze.
