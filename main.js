
let url = "https://api.mocki.io/v1/6b573099/productos";

let products = [];

const request = async (url) => {
    const resp = await fetch(url);
    const data = await resp.json();
    const products = data.products;

    const $cards = document.querySelector(".cards");
    const $template = document.getElementById("template-card").content;
    const $fragment = document.createDocumentFragment();

    products.forEach((element, index) => {
        localStorage.setItem( index, JSON.stringify(element) );
        $template.querySelector("img").setAttribute("src", `https://placeimg.com/200/200/${element.name}`);
        $template.querySelector("img").setAttribute("alt", element.name.toUpperCase());
        $template.querySelector("span").setAttribute("class", `a${index}`);
        

        if(element.stock === 0){
            $template.querySelector("span").textContent = 'Sin Stock';
        }else{
            $template.querySelector("span").textContent = 0;
        }

        let $clone = document.importNode($template, true);
        $fragment.appendChild($clone);
    });

    $cards.appendChild($fragment);

    const lista = document.querySelectorAll("figcaption button");
    lista.forEach( (element, index)=>{
        element.addEventListener("click", ()=>{


            const desired = JSON.parse( localStorage.getItem(index) );

            if( desired.stock > 0 ){

                let num = document.getElementById("torre").textContent;
                num = parseInt(num) + 1;
                document.getElementById("torre").textContent = num;

                desired.stock -= 1;
                localStorage.setItem(index, JSON.stringify(desired));
                num = document.querySelector(`figcaption .a${index}`).textContent;
                num = parseInt(num) + 1;
                document.querySelector(`figcaption .a${index}`).textContent = num;

                const $table = document.querySelector("table");
                const $template = document.getElementById("temple-lines").content;
                let total;
                if( num < 2){

                    total = desired.unit_price;
                    $template.querySelector("tr").setAttribute("class", `a${index}`);
                    $template.querySelector(".one").textContent = desired.name;
                    $template.querySelector(".two").textContent = num;
                    $template.querySelector(".three").textContent = desired.unit_price;
                    $template.querySelector(".four").textContent = total;
                    
                    let $clone = document.importNode($template, true);
                    $table.appendChild($clone);
                }else{
                    document.querySelector(`table .a${index} .two`).textContent = num;
                    document.querySelector(`table .a${index} .four`).textContent = num * desired.unit_price;
                }

                let pagar = document.querySelector(".conteiner-price h3 span").textContent;
                document.querySelector(".conteiner-price h3 span").textContent = parseInt(pagar) + desired.unit_price;

            }else{
                document.querySelector(`figcaption .a${index}`).textContent += ' / Agotado';
                alert("no hay stock");
            }
        });
    });

}

document.querySelector(".conteiner-price .bton").addEventListener("click", () => {
    const name = document.querySelectorAll(`table tr .one`);
    const cant = document.querySelectorAll(`table tr .two`);
    
    if( name.length > 0){

        const pedido = {};
        const listado = [];
        for(let i=0; i<name.length; i++){
            listado.push( { 
                "name": name[i].textContent,
                "cant": cant[i].textContent,
            })      
        }
    
        pedido.solicitud = listado;
        pedido.total = document.querySelector(".conteiner-price h3 span").textContent;
        console.log(pedido);
        alert("Pedido generado");
        location.reload();

    }else{
        alert("No hay productos en el carrito");
    }
});


document.querySelector(`header .bton`).addEventListener("click", ()=>{

    if(document.querySelector(`.mostrar`) === null){
        document.querySelector(`.pedido`).setAttribute("class", "pedido mostrar");

    }else{
        document.querySelector(`.pedido`).setAttribute("class", "pedido");
    }
})

request(url);
