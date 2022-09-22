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
    // os objetos parseados do array e atualiza meu localStorage
    criaElemento(elemento);
})

form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    // Verificando se existe o item no array
    const existe = itens.find(elemento => elemento.nome === nome.value);
    // console.log(existe);

    // Criando um objeto
    const itemAtual = {
        "nome": nome.value,
        "quantidade" : quantidade.value
    }

    // Criando uma condicional que verifica o id
    if(existe){
        itemAtual.id = existe.id;
        // console.log(existe.id);
        
        atualizaElemento(itemAtual);

        // Para sobrescrever o conteudo no localStorage - basta pegar o itens na posicao existe id e
        // igualar ao itemAtual
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
        
    }
    else{
        // Caso o item nao exista, a id do item vale o tamanho
        // assim sendo incrementa sempre
        // Como estamos alterando o tamanho dinamicamente, nao faz sentido 
        // passarmos o id relacionado com o tamanho do Array. Para isso vamos criar uma
        // condição (if/else). Nesse caso estamos utilizando um operador ternario (?)
        // Se itens[itens.length - 1] for positivo (itens[itens.length - 1]).id + 1 e em caso
        // negativo será zero
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;

        // Atualiza minha lista
        criaElemento(itemAtual);

        // Inserindo um objeto no array (Sequencia de objetos)
        itens.push(itemAtual);
    }

 
    // console.log(evento);
    // console.log(evento.target);
    // console.log(evento.target.elements);
    // console.log(evento.target.elements['nome'].value);
    // console.log(evento.target.elements['quantidade'].value);



 

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
    const novoItem = document.createElement("li"); /*criando tag*/
    novoItem.classList.add("item");/*adicionando classe*/

    const numeroItem = document.createElement("strong");/*criando tag*/
    numeroItem.innerHTML = item.quantidade;
    // Colocando um data atributtes atraves do JS
    numeroItem.dataset.id = item.id;

    /*novoItem.innerHTML = numeroItem + nome; 
    Não da certo dessa forma, ao criar um elemento do 
    HTML via JS, não é possível adicionar via conteúdo simples - ele retorna 
    um objeto completo
    para isso é necessairio usar o AppendChild*/
    
   /*Da forma abaixo seria o correto*/ 
   novoItem.appendChild(numeroItem);
   novoItem.innerHTML += item.nome;

   novoItem.appendChild(botaoDeleta(item.id));
   lista.appendChild(novoItem);
}
function atualizaElemento(item){
    document.querySelector("[data-id = '"+item.id+"']").innerHTML = item.quantidade;
}
function botaoDeleta(id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X";

    elementoBotao.addEventListener("click", function(){
        // console.log(this);
        deletaElemento(this.parentNode, id);
    })

    return elementoBotao;
}
function deletaElemento(tag, id){
    tag.remove();

    // Agora precisamos remover um item do array e depois escrever no localStorage
    // itens.splice("O que queremos remover com indice", 1)
    // console.log(id);
    // itens.fundIndex retorna o index de um elemento qualquer.
    // passa o nosso elemeneto que sera igual ao nosso id e deleta
    itens.splice(itens.findIndex(elemento => elemento.id === id),1);
    console.log(itens);
    localStorage.setItem("itens",JSON.stringify(itens));
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

/*
Atualizando os itens

Colocando um data atributtes atraves do JS na tag strong
numeroItem.dataset.id = item.id;

 - Criando uma condicional que verifica se o id existe, caso for verdadeiroo itemAtual id recebe
 existe.id e atualiza o elemento e atualiza o localstorage
- Caso contrario o item atual recebe o length dele que faz com que incremente sempre 1, cria
o elemento novo e insere no array
    if(existe){
        itemAtual.id = existe.id;
        console.log(existe.id);
        
        atualizaElemento(itemAtual);
        
    }
    else{
        Caso o item nao exista, a id do item vale o tamanho
        assim sendo incrementa sempre
        itemAtual.id=itens.length;

        Atualiza minha lista
        criaElemento(itemAtual);

        Inserindo um objeto no array (Sequencia de objetos)
        itens.push(itemAtual);
    }

document.querySelector("[data-id = '"+item.id+"']").innerHTML = item.quantidade;
Atualizando as quantidades no respectivo id

Para sobrescrever o conteudo no localStorage - basta pegar o itens na posicao existe id e
igualar ao itemAtual
itens[existe.id] = itemAtual;
*/

/*
Deletando um elemento
- Criada uma função que cria o botao de deletar (X).
function botaoDeleta() {
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X";

    // Não é possivel usar a arrow function aqui pois a arrow function nao carrega o this
    // Pois precisamos saber quem foi clicado
    elementoBotao.addEventListener("click", function(){
        // console.log(this);
        deletaElemento(this.parentNode);
    })

    return elementoBotao;
}

Criando um elemento no nosso item - botao X
   novoItem.appendChild(botaoDeleta());

    Criando elementos de botao via JSON, eles nao recebem o addEventListener na leitura da pagina
    como nosso form, por isso e necessario criar outro event listener com evento de clique
    Não é possivel usar a arrow function aqui pois a arrow function nao carrega o this
    Pois precisamos saber quem foi clicado. O parent Node aqui indica que desejamos excluir o elemento
    pai de button X

    elementoBotao.addEventListener("click", function(){
        // console.log(this);
        deletaElemento(this.parentNode); 
    })

    return elementoBotao;
}

Com isso podemos eliminar o item no nossa aplicação
function deletaElemento(tag){
    tag.remove();
}
Porém o próximo passo agora é eliminar de nosso localStorage

*/

/*
CODIGO GABARITO

const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach( (elemento) => {
    criaElemento(elemento)
} )

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const existe = itens.find( elemento => elemento.nome === nome.value )

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe) {
        itemAtual.id = existe.id
        
        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    } else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;

        criaElemento(itemAtual)

        itens.push(itemAtual)
    }

    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""
})

function criaElemento(item) {
    const novoItem = document.createElement("li")
    novoItem.classList.add("item")

    const numeroItem = document.createElement("strong")
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem)
    
    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem)
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}

function deletaElemento(tag, id) {
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens))
}
*/




