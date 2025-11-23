import { Car } from "lucide-react";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

export const CartContext= createContext(null);

export const CartProvider=({children})=>{
const [cartItem, setCartItem]=useState([]);

 // Load cart on first load
  useEffect(() => {
    const stored = localStorage.getItem('cartItem');
    if (stored) {
      setCartItem(JSON.parse(stored));
    }
  }, []);

  // Save cart whenever it changes
  useEffect(() => {
    if (cartItem.length !== 0) {
      localStorage.setItem('cartItem', JSON.stringify(cartItem));
    }
  }, [cartItem]);


const addToCart = (product)=>{
    const itemInCart=cartItem.find((item)=>item.id===product.id);
    if(itemInCart){
    //   if item in cart then increase quantity  
     const updatedCart=cartItem.map((item)=>
    item.id===product.id ?{...item, quantity: item.quantity+1}:item
    );
    setCartItem(updatedCart)
     toast.success("Pkhweiq")
    }
    // add new item with quantity one
    else{
        setCartItem([...cartItem,{...product, quantity:1}])
        toast.success("Product is added to cart")
    }
}
const updateQuan=(cartItem, productId, action)=>{
setCartItem(cartItem.map(item=>{
    if(item.id===productId){
        let newUnit=item.quantity;
        if(action==="increase"){
            newUnit+=1;
        } else if(action==="decrease") newUnit-=1;
        return newUnit>0 ? {...item,quantity:newUnit} : null
    }
    return item;
}).filter(item=> item!=null) // remove item 0 quantity
) 
}
// call function on click delete button
const deleteItem=(productId)=>{
    setCartItem(cartItem.filter(item=>item.id!==productId))
}
return <CartContext.Provider value={{cartItem, setCartItem, addToCart,updateQuan, deleteItem}}>
    {children}
    </CartContext.Provider>
}
export const useCart=()=>useContext(CartContext)