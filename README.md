# Atividade Compiladores - Aula 1 - UPF
## Adrian Cerbaro - 178304

### Descrição
Desenvolver um programa para ler um arquivo texto, procurar e listar as palavras contidas em um dicionário de palavras.

- Você deve criar um dicionário com 20 palavras da língua portuguesa.

- O programa deve ler qualquer arquivo texto apresentado a ele.

- Listar todas as palavras encontradas no texto, independente de quantas vezes elas ocorrem.

### Execução do programa

1. Instalação do NodeJS (acima da versão 13)
2. Instalação de dependências:
```bash
npm install
```
3. Execução
```bash
npm start
```

### Opções
```bash
Usage: npm start -- [options] [filename]

Arguments:
  filename               File to parse (default: "test/input.txt")

Options:
  -d, --dict <filename>  Dict file to use (default: "test/dict.txt")
  -h, --help             display help for command
```

### Exemplos
#### Comando padrão
```bash
> npm start
> tsx src/index.ts

Result:
  do: 43329
  estrutural: 1666
  preconizado: 1666
  esperado: 1667
  longo: 3334
  prazo: 3334
  fenômeno: 1667
  internet: 1667
  participar: 1667
  certificação: 1667
  operação: 1667
  convencionais: 1667
  transações: 1667
  atípicas: 1667
  papel: 1667
  interessante: 1667
  maneira: 1666
  índices: 1666
  pretendidos: 1666

tempo de execução: 458.176ms
```

#### Contar todas as palavras de um texto
_É só utilizar o mesmo arquivo como input e dicionário_
```bash
npm start -- test/input.txt -d test/input.txt
> tsx src/index.ts test/input.txt -d test/input.txt

Result:
  gostaria: 1667
  de: 58338
  enfatizar: 1667
  que: 23334
  a: 75638
  execução: 1666
  dos: 25000
  pontos: 3333
  do: 26663
  programa: 1666
  é: 10000
  ...
  técnica: 1666
  empenho: 1667
  analisar: 1667
  julgamento: 1667
  imparcial: 1667
  eventualidades: 1667
  auxilia: 1666
  preparação: 1666
  composição: 1666
  remanejamento: 1667

tempo de execução: 899.754ms
```