export type Guitar = {
    id: number
    name: string
    image: string
    description: string
    price: number
}

export type CartItem = Guitar & { //Hereda
     quantity: number
}

// export type CartItem = Pick<Guitar, 'id' | 'name ' | 'price' > & { //Hereda
//      quantity: number
//  }
