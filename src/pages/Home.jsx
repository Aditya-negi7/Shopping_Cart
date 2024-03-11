import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";

const Home = () => {
  const API_URL = "https://fakestoreapi.com/products";
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  async function fetchProductData() {
    setLoading(true);

    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      if (!res.ok) { // Check for non-200 status code
        throw new Error("Error fetching products");
      }

      setPosts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setPosts([]); // Set empty posts array on error
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <div>
      {loading ? (
        <Spinner className="flex justify-center items-center" aria-live="polite" /> // Add aria-live for accessibility
      ) : posts.length > 0 ? (
        <div className="grid xs:gridcols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh]">
          {posts.map((post) => (
            <Product key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <p>No data found.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
