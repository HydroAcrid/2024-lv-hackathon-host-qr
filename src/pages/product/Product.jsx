// React
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';

// Firebase
import { auth, db } from '../../firebase/config';
import { onValue, ref } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import LoadingSkeleton from '../../components/LoadingSkeleton';

function capitalizeFirstLetterOfEachWord(str) {
  if (!str) return ''; // Handle empty strings
  return str
    .split(' ') // Split the string into an array of words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(' '); // Join the words back into a single string
}

function formatDate(isoDateString) {
  const date = new Date(isoDateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [userID, setUserID] = useState();
  const [loading, setLoading] = useState(true);

  // ensure user is logged in
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserID(user.uid);
      } else {
        navigate('/login');
      }
    });
  }, [setUserID, navigate]);

  // fetch product data from firebase
  useEffect(() => {
    const productRef = ref(db, `products/${id}`);
    onValue(productRef, (snapshot) => {
      const data = snapshot.val();
      setProduct(data);
      setLoading(false);
    });
  }, [id]);

  const handleReturnToProducts = (event) => {
    event.preventDefault();
    navigate('/products');
  }

  if (!userID) {
    navigate('/login');
  }
  if (loading) {
    return <LoadingSkeleton/>
  }
  if (product) {
    return (
      <div className="container mx-auto p-6">
        {/* Close Button */}
        <div className="flex justify-end">
          <button className="btn btn-circle btn-outline" onClick={handleReturnToProducts} >✕</button>
        </div>

        <div className="flex flex-wrap lg:flex-nowrap gap-8 mt-4">
          {/* Left Image Gallery */}
          <div className="flex flex-col gap-4">
            {product.images && product.images.map((img, index) => (
              <div key={`Image #${index}`} className="w-24 h-24 border border-gray-300 rounded-lg overflow-hidden">
                <img
                  src={img}
                  alt={`Image #${index}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-grow border border-gray-300 rounded-lg overflow-hidden">
            {product.images && product.images.length > 0 &&
              <img
                src={product.images[0]}
                alt="Main Product Image"
                className="object-cover w-full h-full"
              />
            }
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col w-full lg:w-1/3 p-4 bg-base-100 rounded-lg shadow-lg">
            {/* Product Title */}
            <h1 className="text-3xl font-bold">{capitalizeFirstLetterOfEachWord(product.name)}</h1>

            {/* Price and University */}
            <p className="text-xl font-semibold mt-2">${product.price}</p>
            <p className="text-sm text-gray-500">Lehigh University</p>

            {/* Action Buttons */}
            <div className="mt-4 flex gap-2">
              <button className="btn btn-outline btn-primary">Message</button>
              <button className="btn btn-outline btn-primary">Save Listing</button>
            </div>

            {/* Details Section */}
            <div className="mt-6">
              <h2 className="font-bold text-lg">Details</h2>
              <p className="text-sm mt-2">
                <span className="font-semibold">Condition: </span>{capitalizeFirstLetterOfEachWord(product.condition)}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Color: </span>{capitalizeFirstLetterOfEachWord(product.color)}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Date Posted: </span>{formatDate(product.created)}
              </p>
            </div>

            {/* Description */}
            <div className="mt-4">
              <p className="text-sm text-gray-700">
                {product.desc}
              </p>
            </div>
          </div>
        </div>
      </div>

    );
  } else {
    return <h1>Error: Product not found</h1>
  }
}

export default Product;