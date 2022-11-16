import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import CartButton from "./custom-components/CartButton";
type PropsType = {
  name: string;
  id: number;
  imgUrl: string;
  price: number;
};

export const StoreItems = ({ name, id, imgUrl, price }: PropsType) => {
const { getItemCartQuantity, inceaseCartQuantity, decreaseCartQuantity, removeFromCart} = useShoppingCart();
  const quantity = getItemCartQuantity(id);

  return (
    <div className="card flex flex-col justify-between">
      <img
        src={imgUrl}
        alt={name}
        className="h-52 w-full"
        style={{ objectFit: "cover" }}
      />
      <div className="flex justify-between items-center mt-3">
        <span className="text-lg font-semibold">{name}</span>
        <span className="text-base text-gray-500">{formatCurrency(price)}</span>
      </div>
      <div className="mt-4">
        {quantity === 0 ? (
          <CartButton handleClick={()=> inceaseCartQuantity(id)} text="Add to cart" />
        ) : (
          <div className="w-1/2 m-auto">
            <div className="flex items-center justify-between mb-3">
              <button onClick={()=>inceaseCartQuantity(id)} className="h-7 w-7 hover:bg-indigo-500 transition-all bg-indigo-600 text-white rounded">
                +
              </button>
              <span className="text-lg">{quantity}</span>
              <button onClick={()=> decreaseCartQuantity(id)} className="h-7 w-7 hover:bg-indigo-500 transition-all bg-indigo-600 text-white rounded">
                -
              </button>
            </div>
            <button onClick={()=> removeFromCart(id)} className="py-1 px-2 flex m-auto bg-red-600 text-white rounded hover:bg-red-500 transition-all">
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
