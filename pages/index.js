import { useEffect, useState } from "react"
import Head from 'next/head'
import usePropiedades from "../hooks/usePropiedades"
import axios from "axios"
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import useFiltro from "../hooks/useFiltro"

const Contenedor = styled.div`
  margin: 0 auto;
  width: 95%;
  max-width: 1200px;
`

const Home = () => {

  const [propiedades, setPropiedades] = useState([])
  const [filtradas, setFiltradas] = useState([])
  const { Propiedades } = usePropiedades(filtradas)
  const { categoria, FiltroUI } = useFiltro()

  // Llamado a API
  useEffect(() => {
    if (categoria) {
      // Filtrar propiedades por categoria
      const filtradas = propiedades.filter(propiedad => propiedad.categoria.id == categoria)
      setFiltradas(filtradas)
    } else {
      // La api trae todo
      const obtenerPropiedades = async () => {
        const resultado = await axios.get("http://localhost:1337/propiedades")
        setPropiedades(resultado.data)
        setFiltradas(resultado.data)
      }

      obtenerPropiedades()
    }

  }, [categoria])

  return (
    <Contenedor>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU=" />
        <link href="https://fonts.googleapis.com/css?family=Lato:400,900&display=swap" rel="stylesheet" />
        <title>Ejemplo CMS Headless con Strapi y NextJS</title>
      </Head>

      <FiltroUI />

      <h2
        css={css`
          text-align: center;
          font-family: 'Lato', sans-serif;
        `}
      >Nuestras casas y departamentos</h2>
      <Propiedades />
    </Contenedor>
  )
}
export default Home
