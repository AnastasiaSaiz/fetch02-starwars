import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";

const Residentes=(props)=>{
  const [data,setData]=useState([])
  useEffect(()=>{
Promise.all(props.residents.map(url=>fetch(url))).then(respuesta=>Promise.all(respuesta.map(res=>res.json()))).then(res=>{
  setData(res);
})
  },[props.residents])

  const personajes=data.map(personaje=>{
    return <p>{personaje.name}</p>
  })
  return<h>{personaje}</h>
}

const infoPlaneta = (props) => {

  const [residents, setResidents] = useState([]);

  useEffect(() => {
    fetch(props.url).then(res => res.json()).then(res => {
      console.log(res)
      setResidents((res.residents))
    })
  }, [props.url])

  return <Residentes residents={residents} />
}

function App() {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState("")

  useEffect(() => {
    fetch("https://swapi.dev/api/planets")
      .then(res => res.json())
      .then((res) => {
        setData(res.results);
      });
  }, []);

  const handleChange = (e) => {

    setUrl("https://swapi.dev/api/planets/" + e.target.value);
  }

  const options = data.map((option, index) => {
    return
    <option value={index + 1}>{option.name}</option>
  });

  return (
    <>
      <select onChange={handleChange}>{options}</select>
      <infoPlaneta url={url} />
    </>
  )
}

export default App;
