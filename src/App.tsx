import { useReducer, useEffect } from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { cartReducer, initialState } from "./reducers/cart-reducers"

function App() {

  const [state, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => { //Va sincronizar - Use Effect para los efectos secundarios cuando nuestro state cambia
      localStorage.setItem('cart', JSON.stringify(state.cart))
  }, [state.cart]) //Cada que cart cambie realiza el codigo anterior

  return (
    <>
    <Header
      cart={state.cart}
      dispatch={dispatch}
    />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {state.data.map((guitar) => ( //Accedemos a data (state), utilizamos un array method (map) y el arreglo que nos retorna lo nombramos guitar
              <Guitar //Iteramos y generamos un componente Guitar por cada elemento en ese arreglo
                key={guitar.id} // Prop especial que siempre debemos utilizar cuando iteremos una lista y le pasamos un valor único
                guitar={guitar}
                dispacth={dispatch}
                // setCart={setCart}//Prop=Funcion
              />
            ))}
        </div>
    </main>

    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

    </>
  )
}

export default App
