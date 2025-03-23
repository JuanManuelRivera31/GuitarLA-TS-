import { db } from "../data/db";
import { CartItem, Guitar } from "../types";

export type CartActions = 
{ type: 'add-to-cart', payload: {item: Guitar} } |
{ type: 'remove-from-cart', payload: {id: Guitar['id']} } |
{ type: 'increase-quantity', payload: {id: Guitar['id']} } |
{ type: 'decrement-quantity', payload: {id: Guitar['id']} } |
{ type: 'clear-cart' } 

export type cartState = {
    data: Guitar[]
    cart: CartItem[]
}

const initialCart = () : CartItem[] => {
    const localStorageCart= localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
    //Si local storage tiene algo va setearlo a arreglo si no su valor inicial es un arreglo vacio
  }

export const initialState: cartState = {
    data: db,
    cart: initialCart()
}

const MAX_ITEMS= 5
const MIN_ITEMS= 1

export const cartReducer = (
    state: cartState = initialState,
    action: CartActions
    ) => {

    if(action.type === "add-to-cart"){

        const itemExists = state.cart.find(guitar => guitar.id === action.payload.item.id)
        let updatedCart : CartItem[] = []
        
        if(itemExists){ //Existe en el carrito      
            updatedCart = state.cart.map( item =>  { //Map inmuta el arreglo y state original y retorna una nueva copia
            if(item.id === action.payload.item.id){
                if(item.quantity < MAX_ITEMS){
                    return {...item, quantity: item.quantity + 1}
                } else{
                    return item
                }
            } else{
                return item //Para que se mantengan el resto de elementos sobre los que no di click 
            }
            })
        } else{ //Seteamos el carrito de compras y lo colocamos en nuestro state
            const newItem : CartItem = {...action.payload.item, quantity: 1} //La accion de agg al carrito
            // setCart([...cart, newItem]) //setCart sabe lo que hay en el state, toma una copia del state y escribe el nuevo elemento State
            updatedCart = [...state.cart, newItem]
        }

        return{
            ...state,
            cart: updatedCart
        }
    }

    if(action.type === "remove-from-cart"){
        const updatedCart = state.cart.filter(item => item.id !== action.payload.id)
        return{
            ...state,
            cart: updatedCart
        }
    }

    if(action.type === "decrement-quantity"){

        const updatedCart= state.cart.map( item =>  {
            if(item.id === action.payload.id && item.quantity > MIN_ITEMS){
              return{ ...item,
              quantity: item.quantity - 1
            }
          }
          return item
          })

        return{
            ...state,
            cart: updatedCart
        }
    }

    if(action.type === "increase-quantity"){

        const updatedCart = state.cart.map( item =>  { //Map inmuta el arreglo y state original y retorna una nueva copia
            if(item.id === action.payload.id && item.quantity < MAX_ITEMS){
              return{
                ...item, //Retorna y mantinene el nombre, imagen, precio de la guitar
                quantity: item.quantity + 1 //Incrementa la cantidad
              }
            }
            return item //Para que se mantengan el resto de elementos sobre los que no di click
          })

        return{
            ...state,
            cart: updatedCart
        }
    } 

    if(action.type === "clear-cart"){
        
        return{
            ...state,
            cart: []
        }
    }
    
    return state
}