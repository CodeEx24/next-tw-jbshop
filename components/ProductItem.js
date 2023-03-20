/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function ProductItem({ product, addToCartHandler }) {
  return (
    <>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg ">
        <Link href={`/product/${product.slug}`}>
          <Image
            //   loader={myLoader}
            src={product.image}
            alt={product.name}
            className="object-cover object-center rounded-lg"
            width={500}
            height={500}
          />
          {/* Natural Image Here
        <img
          className="object-cover object-center rounded"
          alt={product.name}
          src={product.image}
        /> */}
        </Link>

        <div className="p-5">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
            CATEGORY
          </h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">
            {product.name}
          </h2>
          <p className="mt-1">$16.00</p>
          <button
            className="button primary-button"
            onClick={() => addToCartHandler(product)}
          >
            Add to Cart
            {/* <svg
              aria-hidden="true"
              className="w-4 h-4 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg> */}
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductItem;
