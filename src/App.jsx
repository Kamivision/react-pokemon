import axios from 'axios'
import './App.css'

function App() {

  const createTeamMember = (data) => {
    let container = document.querySelector("#container")
    let div = document.createElement("div")
    div.className = "card"
    let h3 = document.createElement("h3")
    let h2 = document.createElement("h2")
    let img = document.createElement("img")
    img.src = data["sprites"]["front_shiny"]
    h2.innerText = data["type"]
    h3.innerText = data["name"]
    div.appendChild(img)
    div.appendChild(h2)
    div.appendChild(h3)
    container.appendChild(div)
  }

  const getPokemonData = (responseData) => {
    let data = responseData['pokemon']
    console.log(data)
    //createTeamMember(data)
    let pokeSelection = data[0]
    console.log(pokeSelection)
    let name = pokeSelection['pokemon']['name']
    console.log(name)
    let requestPokemon = `https://pokeapi.co/api/v2/pokemon/${name}`
    console.log(requestPokemon)
    axios.get(requestPokemon)
    
    .then((response)=>{
      console.log(response)
      createTeamMember(response.data)
    })
    .catch((err)=>{
      console.error(err)
      alert("sorry pokemon doesn't exist")
    })
  }

  const getPokemonType = (type) => {
    let requestURL = `https://pokeapi.co/api/v2/type/${type}`
    console.log(requestURL)
    
    axios.get(requestURL)
    
    .then((response)=>{
      getPokemonData(response.data) 
    })
    .catch((err)=>{
      console.error(err)
      alert("Sorry that type doesn't exist")
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    let data =Object.fromEntries(new FormData(event.target))
    getPokemonType(data['type'])
  }

  return (
    <>
      <h1>Pokemon Theme Team</h1>
    <form onSubmit= {(event)=>handleSubmit(event)}>
        <input type='text' name='type' placeholder='Fairy'/>
        <input type='submit' value='Search'/>
      </form>
      <div id='container'>

      </div>
    </>
  )
}

export default App
