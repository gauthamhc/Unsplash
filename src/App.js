import React, { useState, useEffect } from "react";
import ImageCard from "./components/ImageCard";
import ImageSearch from "./components/ImageSearch";

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [term, setTerm] = useState("");

  const API_KEY = "21706028-cde24d8dc7d17b683f07a31d5";

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${API_KEY}&q=${term}&image_type=photo&pretty=true`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setLoading(false);
        setTerm("");
      })
      .catch((err) => console.log(err));
  }, [term]);

  return (
    <div className="container mx-auto">
      <ImageSearch searchText={(search) => setTerm(search)} />

      {!loading && !images.length ? (
        <h1 className="text-5xl text-center mx-auto mt-2">
          Cannot load...Please try again
        </h1>
      ) : null}

      {/* {!loading && images.length === 0 && (
        <h1 className="text-5xl text-center mx-auto mt-2">
          Cannot load...Please try again
        </h1>
      )} */}

      {loading ? (
        <h1 className="text-6xl text-center mx-auto mt-2">Loading...</h1>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image) => {
            return <ImageCard key={image.id} image={image} />;
          })}
        </div>
      )}
    </div>
  );
}

export default App;
