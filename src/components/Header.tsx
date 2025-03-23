import { useMemo, Dispatch } from "react"
import type { CartItem } from "../types"
import { CartActions } from "../reducers/cart-reducers"

type HeaderProps = {
    cart: CartItem[]
    dispatch: Dispatch<CartActions>
}

export default function Header({
    cart,
    dispatch
} : HeaderProps ){//Tomamos 

//State Derivado
const isEmpty= useMemo( () => cart.length === 0, [cart]) //Derivado porque depende del state carrito
const cartTotal= useMemo( () => cart.reduce( (total, item) => total + (item.quantity * item.price), 0), [cart]) 
//Total(Acumulado luego de iterar sobre los elementos del carrito)

    return (
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="index.html">
                            <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                        </a>
                    </div>
                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div 
                            className="carrito"
                        >
                            <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                            <div id="carrito" className="bg-white p-3">
                                {isEmpty ? ( //True si el carrito está vacio - False si no tiene nd 
                                    <p className="text-center">El carrito esta vacio</p>
                                ) : (
                            <>
                                <table className="w-100 table">
                                    <thead>
                                        <tr>
                                            <th>Imagen</th>
                                            <th>Nombre</th>
                                            <th>Precio</th>
                                            <th>Cantidad</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.map( guitar => (//Iterar sobre el carrito y nos crea el objeto guitar
                                        //Itera y ejecuta este codigo una vez por cada elemento en mi carrito
                                        <tr key={guitar.id}> 
                                        {/* //// Prop especial que siempre debemos utilizar cuando iteremos una lista y le pasamos un valor único - ID unico para evitar registros duplicados */}
                                            <td>
                                                <img 
                                                    className="img-fluid" 
                                                    src={`/img/${guitar.image}.jpg`} //Template string (``) Para inyectar esa variable img
                                                    alt="imagen guitarra" />
                                            </td>
                                            <td>{guitar.name}</td>
                                            <td className="fw-bold">
                                                {guitar.price}
                                            </td>
                                            <td className="flex align-items-start gap-4">
                                                <button
                                                    type="button"
                                                    className="btn btn-dark"
                                                    onClick={() => dispatch({type: 'decrement-quantity',
                                                        payload: {id: guitar.id}})}
                                                >
                                                    -
                                                </button>
                                                    {guitar.quantity}
                                                <button
                                                    type="button"
                                                    className="btn btn-dark"
                                                    onClick={() => dispatch({type: 'increase-quantity',
                                                        payload: {id: guitar.id}})}
                                                >
                                                    +
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-danger"
                                                    type="button"
                                                    onClick={() => dispatch({type: 'remove-from-cart',
                                                        payload: {id: guitar.id}})}
                                                >
                                                    X
                                                </button>
                                            </td>
                                        </tr>
                                        ))} 
                                        {/* //Retorna lo anterior */}
                                    </tbody>
                                </table>
                                
                                <p className="text-end">Total pagar: <span className="fw-bold">${cartTotal}</span></p>                             
                                </>
                            )}
                                <button 
                                    className="btn btn-dark w-100 mt-3 p-2"
                                    onClick={() => dispatch({type: 'clear-cart'})}
                                >Vaciar Carrito</button>
                            
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}