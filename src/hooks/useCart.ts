import { useEffect, useState } from "react";
import { db } from "../data/db";
import {useMemo} from "react"
import type { Guitar, CartItem } from '../types/index'
// los hooks son funciones de JavaScript

export const useCart = () => {

    const initialCart = () : CartItem[] => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }
    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart)

    const MAX_ITEMS = 5
    const MIN_ITEMS = 0

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addToCart(item : Guitar) {
        const itemExists = cart.findIndex(guitar => guitar.id === item.id)
        if (itemExists >= 0) {
            const updateCart = [...cart]
            updateCart[itemExists].quantity++
            setCart(updateCart)
        } else {
            const newItem : CartItem = { ...item, quantity : 1}
            setCart([...cart, newItem])
        }
    }

    function removeFromCart(id : Guitar['id']) {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    function decreaseQuantity(id : Guitar['id']) {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    function increaseQuantity(id : Guitar['id']) {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    function cleanCart() {
        setCart([])
    }
  // Stete Derivado
  
  const isEmpty = useMemo(() => cart.length === 0,[cart]) // useMemo vuelvelo a ejecutar cuando caarrito cambie
  const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity*item.price), 0),[cart] )


    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        cleanCart,
        isEmpty,
        cartTotal
    }
}

