//FUNÇÂO PRA TROCA DE PAGINA COM animação de CARREGAMENTO
function trocarPagina(destino){
    const loading = document.getElementById("loading");
    if(loading){
        loading.style.display = "flex"
    }

    setTimeout(function(){
        window.location.href = destino;
    }, 1000)
}


//evento preencher formulario(pagina pra preencher o formulario)

const formulario = document.getElementById("formDieta");
if(formulario){
    formulario.addEventListener("submit", function(event){
        event.preventDefault();
        if(!formulario.checkValidity()){
            return
        }
        //pegar o peso 
        let peso = document.getElementById("peso").value;//getElementeById retorna o elemento do id do html e o .value acessa esse valor 
        peso = parseFloat(peso)

        let nome = document.getElementById("nome").value;
        let email = document.getElementById("email").value;


        //pegar a altura
        let altura = document.getElementById("altura").value;
        altura = parseFloat(altura)//persefloat transforma string em numero ponto flutuante


        //pegar idade
        let idade = document.getElementById("idade").value;
        idade = parseFloat(idade);//persefloat transforma string em numero ponto flutuante


        //pegar genero
        let genero = document.querySelector('input[name="sexo"]:checked').value;// queryselector usa pra ver qual foi a escolha em caso de botao de selecionar

        // nivel de atividade fisica

        const sedentario = 1.2;
        const leve = 1.375;
        const moderado = 1.55;
        const intenso = 1.725;

        let nivelAtividade = document.getElementById("atividade").value;

        function fatorAtividade(nivelAtividade) {
            // aqui sao constantes que representam cada nivel de atividade na formula utilizada pra calcular as kcal
            const sedentario = 1.2;
            const leve = 1.375;
            const moderado = 1.55;
            const intenso = 1.725;
            if(nivelAtividade === "sedentario"){
                return sedentario
            }else if(nivelAtividade === "leve"){
                return leve
            }else if(nivelAtividade === "moderado"){
                return moderado
            }else if(nivelAtividade === "intenso"){
                return intenso
            }
        }
        let atividade = fatorAtividade(nivelAtividade);

        //DEFINIR O NIVEL DE ATIVIDADE FISICA 
        function definirObjetivo(){
            let objetivo = document.getElementById("objetivo").value
            if(objetivo === "perder"){
                return -300;
            }else if(objetivo === "manter"){
                return 0
            }else if(objetivo === "ganhar"){
                return 300;
            }
        }
        let objetivo = definirObjetivo();

        function definirGenero(genero){
            if(genero === "masculino"){
                return 5;
            }else if(genero === "feminino"){
                return -161
            }
        }
        genero = definirGenero(genero);


        
        function calculoCalorias(peso, altura,idade, genero, atividade, objetivo ){
            let tmb = (10 * peso) + (6.25 * altura)-(5 * idade) + genero;


            let calorias = (tmb * atividade) + objetivo;
            return calorias
    };

    let valorCalorias = calculoCalorias(peso, altura, idade, genero, atividade, objetivo);

    let parametros = new URLSearchParams();// crio uma variavel parametros e declara ela como urlsearchparams que permite criar e manipular parametros que sao colocados na URL do site
    parametros.append("peso", peso);
    parametros.append("altura", altura);
    parametros.append("idade", idade);
    parametros.append("genero", genero);
    parametros.append("atividade", atividade);
    parametros.append("objetivo", objetivo);
    parametros.append("resultado", valorCalorias);
    parametros.append("nome", nome);
    parametros.append("email", email);

    
        
    trocarPagina("formAction.html?" + parametros.toString()); //transforma o parametros em uma string 

    });
};


//pagina de resposta
const resultado = document.getElementById("resultado");
if (resultado) {
    const parametros = new URLSearchParams(window.location.search);

    let valorCalorias = parametros.get("resultado");
    let peso = parametros.get("peso");
    let altura = parametros.get("altura");
    let idade = parametros.get("idade");
    let genero = parametros.get("genero");
    let atividade = parametros.get("atividade");
    let objetivo = parametros.get("objetivo");
    let nome = parametros.get("nome");
    let email = parametros.get("email");

    resultado.textContent = Math.floor(valorCalorias) + " kcal por dia";//mathfloor arredonda o numero pra ficar sem ponto flutuante 


    //innerHTML da um retorn do texto com o html escrito e substiriu pelo novo fornecido isso cria um <p> paragrafo dentro do elemento
    document.getElementById("dadosRecebidos").innerHTML = `
    <p>Nome: ${nome}</p>
    <p>E-mail: ${email}</p>
    <p>Peso: ${peso} kg</p>
    <p>Altura: ${altura} cm</p>
    <p>Idade: ${idade} anos</p>
    <p>Sexo: ${genero === "5" ? "Masculino" : "Feminino"}</p>
`;
    
};

//usar a função de trocar de pagina com animação de carregamento

const botaoNovamente = document.getElementById("calcularNovamente");
if(botaoNovamente){
    botaoNovamente.addEventListener("click", function(event){
        event.preventDefault();
        trocarPagina("form.html")//reaproveita a função criada anteiormente
    });
}


