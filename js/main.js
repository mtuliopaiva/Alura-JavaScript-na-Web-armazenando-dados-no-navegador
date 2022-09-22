/* <form action="" class="adicionar" id="novoItem"> - Utilizando esse ID */
const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');

/*Declarando itens e parseando o array (dividindo o array), em caso de false cria array vazio*/ 
const itens = JSON.parse(localStorage.getItem("itens")) || [];

// Necessario iterar o array para criar os elementos:
itens.forEach ((elemento) => {
    // console.log(elemento);
    // console.log(elemento.nome, elemento.quantidade);

    // Na iteração, chamada a função cria elemento com o parametro elemento passado que são
    // os objetos parseados do array
    criaElemento(elemento);
})

form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

 
    // console.log(evento);
    // console.log(evento.target);
    // console.log(evento.target.elements);
    // console.log(evento.target.elements['nome'].value);
    // console.log(evento.target.elements['quantidade'].value);

    // Criando um objeto
    const itemAtual = {
        "nome": nome.value,
        "quantidade" : quantidade.value
    }

    criaElemento(itemAtual);
    // Inserindo um objeto no array (Sequencia de objetos)
    itens.push(itemAtual);

    // Setando no localStorage o array e transformando mem string o array de objetos
    localStorage.setItem("itens",JSON.stringify(itens));

    /*Deixando vazio o formulario sempre que adicionar*/
    nome.value='';
    quantidade.value='';
})
    // Função que cria elemento
function criaElemento(item){
    // Utlizando a API do document para criar uma LI
    // MODELO da LI - <li class="item"><strong>7</strong>Camisas</li>
    const novoItem = document.createElement('li'); /*criando tag*/
    novoItem.classList.add('item');/*adicionando classe*/

    const numeroItem = document.createElement('strong');/*criando tag*/
    numeroItem.innerHTML = item.quantidade;

    /*novoItem.innerHTML = numeroItem + nome; 
    Não da certo dessa forma, ao criar um elemento do 
    HTML via JS, não é possível adicionar via conteúdo simples - ele retorna 
    um objeto completo
    para isso é necessairio usar o AppendChild*/
    
   /*Da forma abaixo seria o correto*/ 
   novoItem.appendChild(numeroItem);
   novoItem.innerHTML += item.nome; 
   lista.appendChild(novoItem);
}
/*
Criando um array
const itens = [];
*/

/*Elementos criados via JS são objetos*/

/*
No form criado, adiciona um event listener de SubmitEvent que por padrao o form é enviado para a 
propria pagina (Nao queremos isso!). Necessario interromper o comportamento padrao através do:
evento.preventDefault();
form.addEventListener('submit', (evento) => {
    // Interrompendo comportamento padrao
    evento.preventDefault();
}
*/
/*
Capturando informações

Daria certo dessa forma para acessar os dados de nome e quantidade, porem se algo alterar no 
codigo minha logica seria perdida (Estamos em uma posicao fixa). 
Um jeito melhor pode ser feito através do ELEMENT
console.log(evento.target[0].value);
console.log(evento.target[1].value)

Agora dessa forma conseguimos captar através de um objeto com essas informações, 
consequetemente buscamos através de um nome e nao através de um numero
const nome = evento.target.elements['nome'];
const quantidade = evento.target.elements['quantidade'];
*/

/*
Criando um objeto e inserindo um objeto no array
const itemAtual = {
    "nome": nome.value,
    "quantidade" : quantidade.value
}
itens.push(itemAtual);
*/

/*localStorage é um pequeno espaço para armazenar informações
dentro do navegador do usuario
Storage - Cache Storage, cookies, index debugger, local storage e session storage*/

/*Passando o nome e quantidade para o localStorage (PROBLEMA: Ira sobrescrever 
toda vez que adicionarmos novo conteudo)
localStorage.setItem("nome",nome);
localStorage.setItem("quantidade",quantidade);*/

/*localStorage so nos permite armazenar strings
Para criar um grupo de elementos/informações - Criar objeto
Para juntar um grupo de informações em um local - criar um array de objetos
Para armazenar varios objetos é necessario um ARRAY de objetos
localStorage.setItem("item",itemAtual); - Dessa forma irá salvar como objeto, e precisamos 
transformar em string através do JSON stringfy*/

/*
Primeiro sera verificado se existe  algo no localStorage e se for false 
criara um array vazio
Precisamos parsear o array, dividindo em objetos JSON.parse()
const itens = JSON.parse(localStorage.getItem("itens")) || [];
*/




