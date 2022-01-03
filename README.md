# Telzir App

O projeto de **Show me the code - loldesign** consiste em fazer um aplicativo onde o usuário possa calcular o valor de uma ligação telefonica, levando em consideração os Planos de pacote de ligação(em minutos) em comparação com os valores sem nenhum plano.
Assim, o usuário escolhe qual a origem, destino, plano de pacote e o tempo de dada ligação e em seguida recebe o cálculo do valor da ligação tanto com o plano escolhido como também sem nenhum plano.



- Stack nodejs, nextjs e Postgres.

## Execução em ambiente Docker

- ### Requerimentos:
    - [Docker](https://www.docker.com/)
    - [Docker-compose](https://docs.docker.com/compose/)

Foram criados 3 ambientes para a execução da aplicação: Produção, Desenvolvimento e Testes.

- **Produção**: Back-end e front-end devidamente *buildados*, sendo que o front-end servido pelo *[nginx](https://www.nginx.com/)* para o proxy reverso.
- **Desenvolvimento**: Back-end e Front-end sendo executados em padrão de desenvolvimento.
- **Testes**: Execução da aplicação apenas para rodar os testes de unidade e integração.

Cada ambiente cria o seu próprio container de banco de dados utilizando Postgres.

### Criação dos ambientes
Foram criados scripts para se rodar os ambientes com o docker-compose.
Eles devem ser executados de acordo com o sistema operacional utilizado.

- */scripts/windows/..* : execução dos ambientes em windows(arquivos .bat).
- */scripts/linux/..* : execução dos ambientes em linux(arquivos .sh).

Ao serem executados, os containers serão criados e divididos de acordo com a sua stack.

Caso prefira, os arquivos do docker-compose podem ser executados diretamente com os comandos:

### *Buildando* as aplicações

* Sem stack

```
    docker-compose -f {arquivo_docker_compose} up -d --build
```

* Com nome da stack

```
    docker-compose -p {nome_da_stack} -f {arquivo_docker_compose} up -d --build
```

### Subindo containers já Buildados:

* Sem stack

```
    docker-compose -f {arquivo_docker_compose} up -d
```

* Com nome da stack

```
    docker-compose -p {nome_da_stack} -f {arquivo_docker_compose} up -d
```

### Parando a execução containers:

* Sem stack

```
    docker-compose -f {arquivo_docker_compose} down
```

* Com nome da stack

```
    docker-compose -p {nome_da_stack} -f {arquivo_docker_compose} down
```


- O parâmetro -d serve apenas para que o terminal suba os containers e não fique *travado* na tela de log.
- O nome da stack é totalmente opcional mas facilita ao deixar os containers que tem alguma relação separados por grupos, melhorando o controle, principalmente em ferramentas como portainer.

## Utilização

### Front-end:
- Produção: acessado em [http://localhost:8080](http://localhost:8080)
- Desenvolvimento: acessado em [http://localhost:5051](http://localhost:5051)

### Back-end:

Acessado em [http://localhost:5050](http://localhost:5050)

