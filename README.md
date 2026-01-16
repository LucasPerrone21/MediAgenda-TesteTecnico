## Questão 1 – Fundamentos
### Qual a principal diferença entre um ArrayList e um vetor simples em Java?

A principal diferença entre um vetor simples e um ArrayList está no controle de tamanho e na facilidade de uso. Um vetor tem tamanho fixo. Ou seja, no momento em que ele é criado, seu tamanho já está definido e não pode ser alterado. Já o ArrayList tem tamanho dinâmico, crescendo ou diminuindo conforme a necessidade, além de oferecer vários métodos prontos que facilitam o trabalho no dia a dia.

### Quando ainda faz sentido usar vetor simples?

Hoje em dia, vetores costumam ser usados quando: O tamanho da estrutura é conhecido e não vai mudar. Existe preocupação com desempenho ou consumo de memória. Estamos lidando com algoritmos ou estruturas internas mais controladas. Para a maioria das aplicações modernas, especialmente APIs e sistemas web, o ArrayList acaba sendo a escolha mais comum.

## Questão 2 – Arquitetura & Spring
### Para que serve o ```@Autowired``` no Spring Boot? Como isso se relaciona com os ```Providers``` e ```@Injectable()``` do NestJS?

No Spring Boot, o ```@Autowired``` (ou a injeção via construtor) é usado para aplicar o conceito de Injeção de Dependência. Isso significa que o Spring se responsabiliza por criar e fornecer as dependências necessárias para uma classe, em vez de o próprio código fazer isso manualmente.

No NestJS, o funcionamento é muito parecido, ```@Injectable()``` indica que a classe pode ser injetada. O framework cuida de criar e fornecer essa dependência automaticamente. Ambos seguem o mesmo princípio: Inversão de Controle, apenas com sintaxes diferentes.

## Questão 3 – Leitura de Código

O problema está na comparação direta de valores double usando ```==```. Valores de ponto flutuante podem sofrer pequenas imprecisões por causa da forma como são representados internamente. Isso pode fazer com que um valor que “parece” ser ```100.00``` não seja exatamente ```100.00``` na memória. Com isso, a condição pode falhar mesmo quando o valor está correto do ponto de vista do negócio.

## Questão 4 - (Tratamento de Erros)

###  Em Java, qual a diferença entre Checked Exceptions e Unchecked Exceptions ? Como você lidaria com elas em uma API?

Em Java, as exceções se dividem em Checked e Unchecked. As ```Checked Exceptions``` precisam ser tratadas obrigatoriamente pelo compilador e geralmente representam erros previsíveis, como falhas de IO ou acesso a banco de dados. Já as ```Unchecked Exceptions``` estendem ```RuntimeException``` e não exigem tratamento obrigatório, sendo normalmente usadas para indicar erros de lógica ou regras de negócio inválidas. Em uma API, o mais comum é utilizar ```Unchecked Exceptions``` e centralizar o tratamento em um handler global, como o ```@ControllerAdvice```, mapeando as exceções para códigos HTTP apropriados e evitando expor detalhes internos da aplicação.
