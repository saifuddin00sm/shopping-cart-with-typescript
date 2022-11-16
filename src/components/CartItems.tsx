import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";
type PropsType = {
  id: number;
  quantity: number;
};

export default function CartItems({ id, quantity }: PropsType) {
  const item = storeItems.find((items) => items.id === id);
  const { removeFromCart } = useShoppingCart();
  if (!item) return null;

  return (
    <div className="flex justify-between items-center my-4">
      <div className="flex gap-2 items-center">
        <img
          src={item.imgUrl}
          alt={item.name}
          style={{ width: "220px", height: "150px", objectFit: "cover" }}
        />
         <div>
          <p className="text-lg font-semibold">{item.name}</p>
          <p className="text-base text-gray-400">
            {formatCurrency(item.price)}
          </p>
        </div>
      </div>
      <div>Quantity: {quantity}</div>
        <div className="flex gap-2 items-start">
          <span>{formatCurrency(item.price * quantity)}</span>
          <button className="rounded border p-1 text-base flex justify-center items-center" style={{width: '1.7rem', height: '1.7rem'}} onClick={() => removeFromCart(id)}>
            <span>x</span>
          </button>
        </div>
    </div>
  );
}
