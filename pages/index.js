import data from '../utils/data';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import cartStore from '@/utils/Store';

export default function Home() {
  const cart = cartStore((state) => state.cart);

  console.log(cart);

  return (
    <Layout title="Home Page">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.products.map((product) => (
          <ProductItem product={product} key={product.slug}></ProductItem>
        ))}
      </div>
    </Layout>
  );
}
