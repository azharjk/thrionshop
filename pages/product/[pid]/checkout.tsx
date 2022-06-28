import { useRouter } from "next/router";

const Checkout = () => {
  const router = useRouter();

  return <h1>Checkout {router.query.pid}</h1>
};

export default Checkout;
