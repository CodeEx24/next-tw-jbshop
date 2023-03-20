import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import db from '@/utils/db';
import Product from '@/models/Product';
import cartStore from '@/utils/Store';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Home({ products }) {
  const cart = cartStore((state) => state.cart);
  const addCartItems = cartStore((state) => state.cartAddItem);

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    // actual data in database so if there is incoming different orders from users it will get the updated quantity of product.
    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }

    addCartItems({ ...product, quantity });
    toast.success('Product added to the cart');
  };

  return (
    <Layout title="Home Page">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItem
            addToCartHandler={addToCartHandler}
            product={product}
            key={product.slug}
          ></ProductItem>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  // To return plain javascript object that can be easily serialized
  const products = await Product.find().lean();

  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
