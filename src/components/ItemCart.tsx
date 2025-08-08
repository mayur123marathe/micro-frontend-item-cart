import React, { useState, Suspense } from "react";
import "../styles/ItemCart.css";
import { useNavigate } from "react-router-dom";

export type CartData = {
  id: number;
  image: string;
  name: string;
  cuisine: string;
  rating: number;
};

const LazyStoreHandler = React.lazy(() =>
  import("store_remote/Store").then((mod) => {
    const Component = ({ data }: { data: any }) => {
      const { setCart } = mod.useStore();
      return <button onClick={() => setCart(data)}>Add</button>;
    };

    return { default: Component };
  })
);

export type ItemCartProps = {
  data: CartData;
};

const ItemCart: React.FC<ItemCartProps> = ({ data }) => {
  const navigate = useNavigate();
  const { image, name, cuisine, rating } = data;
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="card-details">
      <div onClick={() => navigate(`/product-page/${data.id}`)}>
        <div
          className="image-wrapper"
          style={{ position: "relative", height: "200px", width: "100%" }}
        >
          {!imgLoaded && (
            <div
              className="image-spinner"
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f0f0f0",
                zIndex: 1,
              }}
            >
              <span className="spinner-text">Loading image...</span>
            </div>
          )}
          <img
            src={image}
            alt={name}
            onLoad={() => setImgLoaded(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: imgLoaded ? "block" : "none",
            }}
          />
        </div>

        <div className="price">Items at 200 Rs.</div>
        <div className="item-title">{name}</div>
        <div>Cuisine: {cuisine}</div>
        <div>Ratings: {rating}</div>
      </div>

      <Suspense fallback={<div>Loading Add Button...</div>}>
        <LazyStoreHandler data={data} />
      </Suspense>
    </div>
  );
};

export default ItemCart;
