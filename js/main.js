{/* <form action="" class="adicionar" id="novoItem"> - Utilizando esse ID */}
const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');

// No formulario criado foi criado um event listener de submit
// Por padrão esse formulario é enviado para a propria pagina, e isso não é o que queremos. Para isso
// é necessario interromper o compoartamento padrao através do evento.preventDefault();
form.addEventListener('submit', (evento) => {
    evento.preventDefault();



    // Capturando informações
    // Agora dessa forma conseguimos captar através de um objeto com essas informações, consequetemente
    // buscamos através de um nome e nao através de um numero
    console.log(evento);
    console.log(evento.target);
    console.log(evento.target.elements);
    console.log(evento.target.elements['nome'].value);
    console.log(evento.target.elements['quantidade'].value);

    // Daria certo dessa forma para acessar os dados de nome e quantidade, porem se algo alterar no 
    // codigo minha logica seria perdida (Estamos em uma posicao fixa). Um jeito melhor pode ser feito através do ELEMENT
    // console.log(evento.target[0].value);
    // console.log(evento.target[1].value);

    criaElemento(evento.target.elements['nome'].value, evento.target.elements['quantidade'].value);

})

function criaElemento(nome,quantidade){
    console.log(nome); 
    console.log(quantidade); 

    // Utlizando a API do document para criar uma LI
    // MODELO da LI - <li class="item"><strong>7</strong>Camisas</li>
    const novoItem = document.createElement('li'); /*criando tag*/
    novoItem.classList.add('item');

    const numeroItem = document.createElement('strong');/*criando tag*/
    numeroItem.innerHTML = quantidade;

    /*novoItem.innerHTML = numeroItem + nome; 
    Não da certo dessa forma, ao criar um elemento do 
    HTML via JS, não é possível adicionar via conteúdo simples - ele retorna um objeto completo
    para isso é necessairio usar o AppendChild
    */
   /*Da forma abaixo seria o correto*/ 
   novoItem.appendChild(numeroItem);
   novoItem.innerHTML += nome;

   
   lista.appendChild(novoItem);

    /*Elementos cirados va JS são objetos*/
    console.log(novoItem);
}