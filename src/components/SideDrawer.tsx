import { useShoppingCart } from "../context/ShoppingCartContext";
import CartItems from "./CartItems";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";

type PropsType = {
  openSideBar: boolean;
  closeSideBar: () => void;
};
export default function SideDrawer({ openSideBar, closeSideBar }: PropsType) {
  const { cartItem } = useShoppingCart();

  const totalPrice = cartItem.reduce((total, carts) => {
    const items = storeItems.find((item) => item.id === carts.id);
    return total + (items?.price || 0) * carts.quantity;
  }, 0);

  return (
    <>
      {openSideBar && (
        <div
          onClick={closeSideBar}
          className="w-screen h-screen fixed z-40 top-0"
          style={{ backgroundColor: "rgba(0,0,0,.5)" }}
        ></div>
      )}
      <div
        className={`fixed top-0 right-0 w-0 ${
          openSideBar ? "drawer-animation" : "close-animation"
        } h-screen p-4 bg-white shadow-lg shadow-black-500/50 z-50`}
        style={{ right: openSideBar ? "0" : "-100px", overflowY: 'auto'}}
      >
        <div onClick={closeSideBar} className="mb-4 flex justify-between">
          <h5 className="font-semibold text-2xl">Checkout</h5>
          <button className="p-2 rounded">X</button>
        </div>
        {cartItem.map((item) => (
          <CartItems key={item.id} {...item} />
        ))}
        <div className="text-right border-t">
          <span className="text-2xl font-bold">
            Total: {formatCurrency(totalPrice)}
          </span>
        </div>
      </div>
    </>
  );
}
