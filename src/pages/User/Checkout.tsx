import { useContext, useRef, useState } from "react";
import AddressList from "../../components/addresses/AddressList";
import AdditionalInfo from "../../components/checkout/AdditionalInfo";
import AddAddressModal from "../../components/modals/AddAddressModal";
import { CartContext } from "../../store/CartContext";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import BillCard from "../../components/cart/BillCard";
import { UserContext } from "../../store/UserContext";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";
import { createOrder } from "../../api/orders";

const Checkout = () => {
  const notesRef = useRef<HTMLTextAreaElement>(null);
  const [addressModalShown, setAddressModalShown] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  ///////////////////////
  const axiosPrivate = useAxiosPrivate();
  const {
    state: { user },
  } = useContext(UserContext);
  const {
    state: { cart, cartLoading },
  } = useContext(CartContext);

  const placeOrder = async () => {
    if (!cart) return;
    const shippingFee: number = cart?.totalPrice < 50 ? 5.0 : 0;
    const total: number = cart?.totalPrice + shippingFee;
    const order = {
      orderedProducts: cart?.cartProducts,
      totalPrice: total,
      user: user?._id,
      paymentMethod,
      deliveryFee: shippingFee,
      address: user?.addresses.find((i) => i._id === selectedAddressId),
      notes: notesRef.current?.value,
    };

    setLoading(true);
    await createOrder(axiosPrivate, order);
    setLoading(false);
  };

  if (cartLoading) return <LoadingSpinner />;

  return (
    <>
      {addressModalShown && (
        <AddAddressModal
          text="Add New Address"
          closeModal={() => setAddressModalShown(false)}
        />
      )}
      <div className="section-sm">
        <div className="container">
          <div className="checkout">
            <div>
              <AddressList
                select={true}
                onOpenAddressModal={() => setAddressModalShown(true)}
                filledButton={true}
                headerTwo
                addresses={user?.addresses || []}
                setSelectedAddressId={setSelectedAddressId}
                selectedAddressId={selectedAddressId}
              />
              <AdditionalInfo ref={notesRef} />
            </div>
            {cart !== null && (
              <BillCard
                cart={cart}
                type="checkout"
                placeOrder={placeOrder}
                setPaymentMethod={setPaymentMethod}
                loading={loading}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
