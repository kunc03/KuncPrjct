import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import React from 'react';
import addData, { getDocument, signIn } from '@/lib/firebase/services';
import { useEffect, useState } from 'react';
import Navbar from '@/components/pages/Navbar';

const AdminPage = () => {
  const { user } = useAuthContext();
  const [product, setProduct] = React.useState('');
  const [productPrice, setProductPrice] = React.useState('');
  const router = useRouter();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const { result, error } = await getDocument('products', 'product-id');
      if (isMounted) {
        if (error) {
          setError(error);
        } else {
          setData(result);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  React.useEffect(() => {
    if (user == null) router.push('/');
  }, [user]);

  const handleForm = async () => {
    const data = {
      name: product,
      price: productPrice,
    };
    const { result, error } = await addData('products', 'product-id', data);

    if (error) {
      return console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <Navbar />
      <div className="w-full h-[70vh] flex items-center justify-center">
        <div className="p-6 border-[1px] border-gray-300 flex flex-col justify-center items-center gap-5 lg:w-[40%] md:w-[40%] w-[95%]">
          <h1 className="text-3xl font-semibold text-sky-600">Add Product</h1>
          <form className="form flex flex-col w-full gap-5">
            <label htmlFor="product">
              <p>Name</p>
              <input onChange={(e) => setProduct(e.target.value)} required type="text" name="product" id="product" placeholder="your product" className="p-2 w-full outline-none" />
            </label>
            <label htmlFor="price">
              <p>Price</p>
              <input onChange={(e) => setProductPrice(e.target.value)} required type="number" name="price" id="price" placeholder="price" className="p-2 w-full outline-none" />
            </label>
            <button type="button" onClick={handleForm} className="bg-sky-600 py-2 text-sky-50 font-semibold hover:ring-[1px] hover:ring-sky-600 hover:bg-sky-50 hover:text-sky-600 duration-300">
              Add
            </button>
          </form>
          {/* {data.map((product, index) => (
          <div key={index}>
            <h1>{product.name}</h1>
            <p>{product.price}</p>
          </div>
        ))} */}
          <div className="flex flex-col gap-2 justify-center items-center">
            <h1>New Products</h1>
            <div className="flex gap-5 items-center">
              <p>{data.name}</p>
              <p>{data.price}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
