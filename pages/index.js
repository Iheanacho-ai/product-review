import Head from 'next/head'
import { useState } from 'react'
import { getXataClient } from '../src/xata';

export default function Home({products}) {
  const [productName, setProductName] = useState()
  const [productPrice, setProductPrice] = useState()
  const [productReview, setProductReview] = useState()
  const [productImage, setproductImage] = useState()

  const openupWidget = () => {
    window.cloudinary.openUploadWidget(
      { cloud_name: 'amarachi-2812',
        upload_preset: 'xoskczw2'
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          //we save the image URL
          setproductImage(result.info.url)
        }
      }
    ).open();
  } 

  const submitProduct = () => {
    fetch('/api/add-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        productName,
        productPrice,
        productReview,
        productImage
      })
    }).then(() => {
      window.location.reload();
    }).catch((error)=> {
      console.log(error)
    });
  }

  const deleteProduct = (id) => {
    fetch("/api/delete-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }).then(() => {
      window.location.reload();
    }).catch((error)=> {
      console.log(error)
    });
  }


  return (
    <div className= 'background-remover'>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Background-remover" />
        <script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript"/>
      </Head>
      <div className="image-submit-container mt-5 md:mt-0 md:col-span-2">
        <form action="#" method="POST">
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div>
                <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <div className="mt-1">
                  <textarea
                    id="productName"
                    name="productName"
                    rows={1}
                    value= {productName}
                    onChange = {(e)=> setProductName(e.target.value)}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    />
                </div>
                
              </div>
              <div>
                <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <div className="mt-1">
                  <textarea
                    id="productPrice"
                    name="productPrice"
                    rows={1}
                    value= {productPrice}
                    onChange = {(e)=> setProductPrice(e.target.value)}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    />
                </div>
                
              </div>
              <div>
                <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                  Review
                </label>
                <div className="mt-1">
                  <textarea
                    id="productReview"
                    name="productReview"
                    rows={3}
                    value= {productReview}
                    onChange = {(e)=> setProductReview(e.target.value)}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    />
                </div>
                
              </div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" onClick= {openupWidget}>
                Upload files
              </button>

              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  onClick={submitProduct}
                  className="cursor inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>

            </div>
          </div>
        </form>
      </div>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Images</h2>
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {
                products.map(({productImage, productReview, productPrice, id}) => (
                  <a href="#" className="group" id= {id}>
                    <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                      <img src={productImage} alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." className="w-full h-full object-center object-cover group-hover:opacity-75" />
                    </div>
                    <h3 className="mt-4 text-sm text-gray-700">${productPrice}</h3>
                    <div>{productReview}</div>
                    <button
                      type="button"
                      className="cursor inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={()=> deleteProduct(id)}
                    >
                    Delete
                  </button>
                  </a>
                ))
              }
            </div>   

        </div>
      </div>
    </div>
  )
}


export const getServerSideProps = async () => {
  const xata = getXataClient();
  const products = await xata.db["Product-Review"].getAll()
  return { props: { products } }
}