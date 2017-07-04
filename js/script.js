
const valor = document.querySelector('div.valores');
const minimo = document.querySelector('div.minimo');
const maximo = document.querySelector('div.maximo');
const media = document.querySelector('div.media');
const amplitude = document.querySelector('div.amplitude');
const mediana = document.querySelector('div.mediana');
const desvio = document.querySelector('div.desvio');
const colunas = document.querySelector('div.colunas');
const escrever = document.querySelector('div.escrever');
const form1 = document.querySelector('form.vares');
const form2 = document.querySelector('form.classe');
const nc = document.querySelector('div.nc');
const Valores = {
  valores: [],
  classes: [],
  get organizar() {
    this.valores.sort(function (a, b) {
    return a - b;
    })
  },
  get mediana() {
    let vetor = this.valores;
    if (vetor.length % 2 === 1) {
      return vetor[parseInt(vetor.length / 2)];
    } else {
      let a = vetor[parseInt(vetor.length / 2)];
      let b = vetor[parseInt(vetor.length / 2) - 1];
      return (a + b) / 2;
    }
  },

  get amplitude() {
    return this.maximo - this.minimo;
  },
  get maximo() {
    return this.valores[this.valores.length - 1];
  },
  get minimo() {
    return this.valores[0];
  },
  get media() {
    let soma = 0;
    for (let valor of this.valores) soma += valor;
    return soma / this.valores.length;
  },
  get desvio(){
    let desvio = 0;
    for (var i = 0; i < this.valores.length; i++){
     desvio += Math.pow((this.valores[i] - this.media), 2);
   }
   return desvio / this.valores.length;
 },
  atualizaView: function () {
    let html = "";
    for (let valor of this.valores) {
        html += `<p>${valor}</p>`;
    }
    valor.innerHTML = html;
    media.textContent = this.media;
    maximo.textContent = this.maximo;
    minimo.textContent = this.minimo;
    amplitude.textContent = this.amplitude;
    mediana.textContent = this.mediana;
    desvio.textContent = this.desvio;

    let escala = 0;
    let total = 0;
    for (let c of this.classes) {
      c.zerar();
      for (let n of this.valores) c.conta(n);
      if (c.contagem > escala) escala = c.contagem;
      total += c.contagem;
    }
    for (let c of this.classes) c.desenha(escala);
    if(total === 0){
      tamanho = (Valores.valores.length - total) / Valores.valores.length * 100;
      nc.style.height = `${tamanho}%`;
      nc.textContent = Valores.valores.length - total;
    }else{
      tamanho = (Valores.valores.length - total) / escala * 100;
      nc.style.height = `${tamanho}%`;
      nc.textContent = Valores.valores.length - total;
    }
  },
  adiciona: function (valor) {
    let v = parseFloat(valor);
    if (v >= 0) {
      this.valores.push(v);
      this.valores.sort(function (a, b) {
        return a - b
      });
      this.atualizaView();
    }
  }
};

function Classe(nome, de, ate) { //

  this.nome = nome;
  this.de = de;
  this.ate = ate;
  this.contagem = 0;

  this.div = document.createElement('div');
  this.div.className = 'coluna';
  this.div.classList.add('coluna');
  this.div.textContent = '0';
  colunas.appendChild(this.div);

  var label = document.createElement('label');
  label.textContent = this.nome;
  escrever.appendChild(label);

  this.desenha = function (escala) {
    let tamanho = this.contagem / escala * 100;
    this.div.style.height = `${tamanho}%`;
    this.div.textContent = this.contagem;
  }

  this.zerar = function () {
    this.contagem = 0;
  }

  this.conta = function(n) {
    if (this.verifica(n)) this.contagem++;
  }

  this.verifica = function(n) {
    if (this.de instanceof Classe) {
      return n > this.de.ate && n <= this.ate;
    } return n >= this.de && n <= this.ate;
  }
}

form1.addEventListener('submit', function (evento) {
  Valores.adiciona(this.valors.value);
  evento.preventDefault();
});
form2.addEventListener('submit', function (evento) {
  let d = new Classe(this.name.value, this.n1.value, this.n2.value);
  Valores.classes.unshift(d);
  Valores.atualizaView();
  evento.preventDefault();
});
