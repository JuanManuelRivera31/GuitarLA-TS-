import { Dispatch } from 'react'
import type { CartActions } from '../reducers/cart-reducers'
import type { Guitar } from '../types'

type GuitarProps = {
    guitar : Guitar,
    dispacth: Dispatch<CartActions>
}

export default function Guitar({guitar, dispacth} : GuitarProps) {

    const { name, image, description, price }= guitar;

    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
                <div className="col-4">
                    <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen guitarra" />
                </div>
                <div className="col-8">
                    <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                    <p>{description}</p>
                    <p className="fw-black text-primary fs-3">${price}</p>
                    <button 
                        type="button"
                        className="btn btn-dark w-100"
                        // onClick={() => setCart(prevCart => [...prevCart, guitar])} //La funcion setCart sabe lo que hay en el state, toma esa copia y escribe el nuevo State
                        onClick={() => dispacth({type: 'add-to-cart', payload: {item: guitar}})}
                    >Agregar al Carrito</button>
                </div>
            </div>
    )
}