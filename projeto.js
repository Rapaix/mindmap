class Nodo{
    constructor(value){
        this.value = value;
        this.pai = null;
        this.filhos = []; 
    }
}
class Arvore{
    constructor(){
        this.raiz = null;
    }
    inserirRaiz(nodo){
        if (!this.raiz){
            this.raiz = nodo;
            // console.log(this.raiz);
        }
        else{
            this.raiz.pai = nodo;
            nodo.filhos.push(this.raiz);
            this.raiz = nodo;
        }
    }
    inserirNodo(nodo, nodoPai){
        if(this.raiz.filhos==0){
            nodo.pai = nodoPai;
            this.raiz.filhos.push(nodo);
            nodoPai.filhos.push(nodo);
        return;
        }

        if (!this.buscaNodo(nodoPai.children)){
            console.log(nodoPai.children);
            console.log("Não existe");
            return;
        }
        nodo.pai = nodoPai;
        nodoPai.filhos.push(nodo);
        return;
    }
    removeNodo(nodo){
        if (nodo.filhos){
            console.log("Nodo tem Filhos");
        }
        else{
            pos = 0
            for(let i = 0; i < nodo.pai.filhos.length;i++){
                if (i != nodo){
                    pos += 1;
                }else{
                    break;
                }
            }
        }
        return;
    }
    imprimir(){

    }
    buscaNodo(info, nodo=''){
        let resultado = false;
        if (nodo == ''){
            nodo = this.raiz;
        }
        let nodoAtual = nodo;
        if (nodoAtual.value == info);
            return true;
        for(let i =0 ; i< nodoAtual.filhos.length;i++){
            resultado = this.buscaNodo(info,i);
            if (resultado){
                break
            }
        }
        return resultado;
    }

}   

const arvore = new Arvore();
let nodo0 = new Nodo("0");
let nodo1 = new Nodo("Filho1");
let nodo2 = new Nodo("Filho2");
let nodo3 = new Nodo("Filho3");
let nodo4 = new Nodo("Filho4");
let nodo5 = new Nodo("Filho5");
arvore.inserirRaiz(nodo0);
console.log("raiz--------------");
console.log(arvore.raiz);


arvore.inserirNodo(nodo4, nodo0);
arvore.inserirNodo(nodo5, nodo0);

console.log("node inserido:------------------");

console.log(arvore);
