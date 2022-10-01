var button = document.querySelector('#app form button')
var zipCodeField = document.querySelector('#app form input')
var content = document.querySelector('#app main')

button.addEventListener('click', run)

function run (event) {
    event.preventDefault()

    var zipCode = zipCodeField.value

    //tratativas
    zipCode = zipCode.replace(' ', '')
    zipCode = zipCode.replace('.', '')
    zipCode = zipCode.trim()

    axios.get(`https://viacep.com.br/ws/${zipCode}/json/`)
    .then( function (response) {
        //Caso a API retorne um erro dentro dela (CEP que não existe)
        if(response.data.erro) {
            throw new Error('CEP Inválido')
        }

        content.innerHTML = ''
        createLine(response.data.logradouro)
        createLine(response.data.localidade + '/' + response.data.uf)
        createLine(response.data.bairro)
    }).catch(function (error) {
        content.innerHTML = ''
        createLine('Ops! Algo deu errado')
    })

}

function createLine(text) {
    var line = document.createElement('p')
    var text = document.createTextNode(text)

    line.appendChild(text)
    content.appendChild(line)
}