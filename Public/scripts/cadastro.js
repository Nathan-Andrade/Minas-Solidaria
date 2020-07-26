function populateUfs(){
  const ufSelect = document.querySelector("select[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(res => res.json()).then(states => {
    for (const state of states){
      ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
    }
  })
}
populateUfs()

function getCities(event){
  const citySelect = document.querySelector("select[name=city]")
  const stateInput = document.querySelector("input[name=state]")
  const ufValue = event.target.value

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState]

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  citySelect.innerHTML = `<option value="">Selecione a cidade</option>`
  citySelect.disabled = true

  fetch(url).then(res => res.json()).then(cities =>{
    for(const city of cities){
      citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
    }
    citySelect.disabled = false
  })
}
document.querySelector("select[name=uf]").addEventListener("change", getCities)

//Contatos para ajuda
//Pegar todas as li
const contatosToHelp = document.querySelectorAll(".contatos-grid li")

for (const contato of contatosToHelp){
  contato.addEventListener("click", handleMarkedContato)
}

const collectedContatos = document.querySelector("input[name=contatos]")

let selectedContatos = []

function handleMarkedContato(){
  const contatoLi = event.target
  //adicionar ou remover uma classe com javascript
  contatoLi.classList.toggle("marked")

  const contatoId = contatoLi.dataset.id

  //console.log(`ITEM ID:`, contatoId)
  
  //verificar se existem contatos estão selecionados, se sim
  //pegar os contatos selecionados
  const alreadySelected = selectedContatos.findIndex( contato =>{
    const contatoFound = contato == contatoId //isso será true or false
    return contatoFound
  })

  //se já estiver selecionado tirar da seleção
  if(alreadySelected >= 0){
    //tirar da selecao
    const filteredContatos = selectedContatos.filter(contato =>{
      const contatoIsDifferent = contato != contatoId
      return contatoIsDifferent
    })
    selectedContatos = filteredContatos
  }else{
    //se não estiver selecionado,
    //adicionar a selecao
    selectedContatos.push(contatoId)
  }

  //console.log(`selectedContatos:`, selectedContatos)

  //atualizar o campo escondido com os contatos selecionados
  collectedContatos.value = selectedContatos
}