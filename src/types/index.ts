export type Guitar = {
    id: number
    name: string
    image: string
    description: string
    price: number
}

export type CartItem = Guitar & { 
    //Heredara Guitar y los atributos siguientes
    quantity:  number
}

export type GuitarID = Guitar['id']
