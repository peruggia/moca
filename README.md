# MoCA - Monitoramento do Consumo de Água

## Requerimentos
- Mysql (Testado com Ver 14.14 Distrib 5.7.18)
- Node (Testado com v7.9.0)
- Git

## Instalação
##### Git
Clone esse repósitorio com esse comando: `git clone git@github.com:peruggia/moca.git`. Isso criará uma pasta chamada `/moca` e colocará os arquivos lá dentro.

##### Node
Entre na pasta `cd moca` e execute `npm install` que instalará os pacotes necessários. (precisa do node instalado pra fazer isso)

##### Database
Pegue o conteúdo do arquivo `database_script.sql` e execute no seu banco. Um DB chamado `moca` será criado junto com as tabelas e alguns dados simples.

## Executando
No console, vá até a pasta do projeto (se já não estiver lá) e execute `npm run dev`.
Isso executará o servidor na porta 3000.

**Observe que no arquivo `pool.js` tem a configuração do banco, com senha e tudo. Caso a sua configuração seja diferente, apenas altere o arquivo e sucesso.**

## Testando
Para testar basta acessar a URL `http://localhost:3000/` no seu navegador (Chrome, Firefox, Edge ou Safari), e para logar basta clicar no botão `Entrar`, o protótipo não faz validação de login e senha.