import React, { useEffect, useState } from "react";
import calculatePercentage from "../utils/calculatePercentage";
import MyButton from "../components/MyButton";
import {
  AddShoppingCart,
  FavoriteBorder,
  FavoriteOutlined,
} from "@mui/icons-material";
import AddToCartInput from "../components/AddToCartInput";
import Slider from "react-slick/lib/slider";
import ProductCard from "../components/ProductCard";
import NextArrow from "../components/NextArrow";
import PrevArrow from "../components/PrevArrow";
import useGetProduct from "../hooks/highLevelHooks/products/useGetProduct";
import { useParams } from "react-router-dom";
import useGetProductsBySubCategory from "../hooks/highLevelHooks/products/useGetProductsBySubCategory";
import MyLoader from "../components/MyLoader";

const Product = () => {
  const { id } = useParams();
  const { product, fetching } = useGetProduct(id);
  if (fetching) return <MyLoader />;
  if (product)
    return (
      <div>
        <ImageAndInfo product={product} />
        <DetailsAndReviews product={product} />
        <RelatedProducts product={product} />
      </div>
    );
};

export default Product;
const ImageAndInfo = ({ product }) => {
  const { images, colors } = product;
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [currentImage, setCurrentImage] = useState(encodeURI(images[0]));
  const [zoomStyle, setZoomStyle] = useState({
    backgroundPosition: "center",
  });
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomStyle({
      backgroundImage: `url(${currentImage})`,
      backgroundPosition: `${x}% ${y}%`,
    });
  };
  const handleMouseLeave = () => {
    setZoomStyle({
      backgroundPosition: "center",
      backgroundImage: "none",
    });
  };
  const [changeInWishlist, setChangeInWishlist] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    if (!localStorage) return;
    const wishlist = localStorage.getItem("wishlist");
    const parsedWishlist = JSON.parse(wishlist);

    setWishlist(parsedWishlist);
  }, [changeInWishlist]);
  const addToWishlist = () => {
    if (!product) return;
    const prevWishlist = JSON.parse(localStorage.getItem("cart"));

    const newItem = product._id;
    prevWishlist.push(newItem);

    try {
      localStorage.setItem("wishlist", JSON.stringify(prevWishlist));
      setChangeInWishlist((prev) => !prev);
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  };
  const removeFromWishlist = (id) => {
    const prevWishlist = wishlist;
    const newWishlist = prevWishlist.filter((item, index) => {
      return id !== item;
    });
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    setChangeInWishlist((prev) => !prev);
  };
  return (
    <div className="border-t-2 py-10 px-10 grid 1000px:grid-cols-2 grid-cols-1  gap-8">
      <div>
        <div
          className="image-zoom-container  bg-neutral2-800 rounded-lg relative overflow-hidden bg-no-repeat group cursor-crosshair p-5"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={zoomStyle}
        >
          <img
            src={currentImage}
            alt="Product"
            className=" max-w-full mx-auto h-[30rem] object-contain transition-opacity duration-300 ease-in-out group-hover:opacity-0 group-hover:transition-opacity "
          />
        </div>
        <div className="flex gap-2 my-5 overflow-x-auto py-4 smallScrollBar">
          {images.map((image, index) => {
            return (
              <div
                key={index}
                onClick={() => setCurrentImage(image)}
                className={`bg-neutral2-800 min-w-max border cursor-pointer rounded-lg ${
                  currentImage === image && " border-accent shadow-md"
                }`}
              >
                <img
                  src={image}
                  alt="productImage"
                  className="max-w-full  size-32"
                />
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <div className="border-b-2 pb-4">
          <h4>{product?.name}</h4>
          <div className="my-3 flex gap-2 items-center ">
            <p
              className={`${
                product?.salePrice && "line-through opacity-50"
              } text-3xl`}
            >
              ${product?.originalPrice}
            </p>
            {product?.salePrice && (
              <p className="text-3xl font-bold text-primary">
                ${product?.salePrice}
              </p>
            )}
            {product?.salePrice && (
              <div className=" text-xs bg-accent p-1 px-2 rounded text-white">
                Save -
                {calculatePercentage(
                  product?.salePrice,
                  product?.originalPrice
                )}
                %
              </div>
            )}
          </div>
        </div>
        <div className="py-6 border-b-2">
          <p className="text-secondary tracking-wide">{product?.description}</p>
        </div>
        <div className="py-6 border-b-2">
          <div className="flex justify-between items-center gap-10">
            <h6>Availability:</h6>
            <span className="text-primary text-sm font-medium">
              {product?.stock > 0
                ? `${product?.stock} Remaining`
                : `Out of Stock`}
            </span>
          </div>
          <div className="flex 450px:flex-row flex-col my-2 justify-between 450px:items-center gap-x-10 gap-y-2">
            <h6>Colors:</h6>
            <div className=" flex items-stretch  gap-2 flex-wrap">
              {colors.length === 0 && <span>Default Color</span>}
              {colors.map((color, index) => {
                return (
                  <span
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: color }}
                    className={`bg-[${color}] cursor-pointer ${
                      selectedColor === color &&
                      `outline-double   outline-offset-1`
                    } px-4 py-2 h-full`}
                  ></span>
                );
              })}
            </div>
          </div>
        </div>
        <div className="py-6 border-b-2 flex flex-col gap-6">
          <AddToCartInput product={product} />
          {!wishlist?.includes(product?._id) ? (
            <a
              onClick={() => {
                addToWishlist();
              }}
              className="cursor-pointer text-sm flex items-center gap-1 hover:text-primary transitional"
            >
              <FavoriteBorder className="!text-lg" />
              Add To Wishlist
            </a>
          ) : (
            <a
              onClick={() => {
                removeFromWishlist(product?._id);
              }}
              className="cursor-pointer text-sm flex items-center gap-1 hover:text-primary transitional"
            >
              <FavoriteOutlined className="!text-lg" />
              Remove from Wishlist
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
const DetailsAndReviews = ({ product }) => {
  const [currentTab, setCurrentTab] = useState(0);
  return (
    <div className="my-20 px-10">
      <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {currentTab === 0 && (
        <p className="my-10 fadeIn">
          {product?.details.split(".").map((sentence, index) => (
            <span key={index}>
              {sentence.trim()}
              {index < product?.details.split(".").length - 1 && (
                <>
                  .<br />
                  <br />
                </>
              )}
            </span>
          ))}
        </p>
      )}
    </div>
  );
};
const Tabs = ({ currentTab, setCurrentTab }) => {
  return (
    <div className="border-b-2 pb-4 flex items-center gap-8">
      <div
        className={`relative cursor-pointer`}
        onClick={() => setCurrentTab(0)}
      >
        <h6
          className={`${
            currentTab === 0 &&
            "before:absolute before:top-[42px] before:left-0 before:w-full before:h-[0.15rem] before:bg-primary before:fadeIn text-primary"
          } font-bold transitional`}
        >
          Details
        </h6>
      </div>{" "}
      <div
        className={`relative cursor-pointer`}
        onClick={() => setCurrentTab(1)}
      >
        <h6
          className={`${
            currentTab === 1 &&
            "before:absolute before:top-[42px] before:left-0 before:w-full before:h-[0.15rem] before:bg-primary before:fadeIn text-primary"
          } font-bold transitional`}
        >
          Reviews
        </h6>
      </div>
    </div>
  );
};
const RelatedProducts = ({ product }) => {
  const { productsBySubCategory: products } = useGetProductsBySubCategory(
    product?.subCategory
  );
  const settings = {
    dots: false,
    infinite: products?.length > 1,
    speed: 1000,
    slidesToShow: products?.length >= 4 ? 4 : products?.length || 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow myClassName={"group-hover:!-right-2"} />,
    prevArrow: <PrevArrow myClassName={"group-hover:!-left-2"} />,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: products?.length >= 3 ? 3 : products?.length || 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: products?.length >= 2 ? 2 : products?.length || 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="my-20 space-y-10 group p-10">
      <h3 className="text-center">Related Products</h3>
      <ProductsSlider settings={settings} products={products} />
    </div>
  );
};
const ProductsSlider = ({ settings, products = [] }) => {
  return (
    <Slider {...settings}>
      {products?.map((product, index) => {
        return <ProductCard product={product} key={index} />;
      })}
    </Slider>
  );
};
