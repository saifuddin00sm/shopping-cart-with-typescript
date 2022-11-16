import { createContext, useContext, useState } from "react";
import SideDrawer from "../components/SideDrawer";
import useLocalStorage from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
  children: React.ReactNode;
};
type ShoppingCartContextType = {
  getItemCartQuantity: (id: number) => number;
  inceaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  openCart: () => void;
  closeCart: () => void;
  cartItem: CartItem[];
  cartQuantity: number;
};
type CartItem = {
  id: number;
  quantity: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContextType);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderProps) => {
  const [cartItem, setCartItem] = useLocalStorage<CartItem[]>('shopping-cart',[]);
  const [openSideDrawer, setOpenSideDrawer] = useState(false)
  const cartQuantity = cartItem.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  function inceaseCartQuantity(id: number) {
    setCartItem((currItems) => {
      if (!currItems.find((item) => item.id === id)) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id: number) {
    setCartItem((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: number) {
    return setCartItem((currItems) =>
      currItems.filter((item) => item.id !== id)
    );
  }

  function getItemCartQuantity(id: number) {
    const itemsQuantities = cartItem.find((item) => item.id === id); 
    return itemsQuantities?.quantity || 0;
  }

  const openCart = () => setOpenSideDrawer(true);
  const closeCart = ()=>  setOpenSideDrawer(false);

  return (
    <ShoppingCartContext.Provider
      value={{
        removeFromCart,
        decreaseCartQuantity,
        getItemCartQuantity,
        inceaseCartQuantity,
        openCart,
        closeCart,
        cartItem,
        cartQuantity,
      }}
    >
      {children}
      <SideDrawer openSideBar={openSideDrawer} closeSideBar={closeCart}/>
    </ShoppingCartContext.Provider>
  );
};
