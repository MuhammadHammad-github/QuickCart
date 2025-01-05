import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import MyDropDown from "../components/MyDropdown";
import MyAccordion from "../components/MyAccordion";
import ProductCard from "../components/ProductCard";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  GridView,
  List,
} from "@mui/icons-material";
import ProductCardList from "../components/ProductCardList";
import useGetCategories from "../hooks/highLevelHooks/categories/useGetCategories";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useGetProducts from "../hooks/highLevelHooks/products/useGetProducts";
import useGetProductsByCategory from "../hooks/highLevelHooks/products/useGetProductsByCategory";
import useGetProductsBySubCategory from "../hooks/highLevelHooks/products/useGetProductsBySubCategory";
import MyInput from "../components/MyInput";
import MyButton from "../components/MyButton";
import { enqueueSnackbar } from "notistack";
import { CircularProgress } from "@mui/material";
import useGetProductsBySearch from "../hooks/highLevelHooks/products/useGetProductsBySearch";

const Shop = () => {
  const { category, subCategory, search } = useParams();
  const [colors, setColors] = useState([]);
  const [filters, setFilters] = useState({});
  const [gridView, setGridView] = useState(true);
  const [sortBy, setSortBy] = useState({ value: "default", text: "default" });
  useEffect(() => {
    if (category === "null" && subCategory === "null" && search === "null") {
      setFilters((prev) => {
        return { ...prev, subCategory: null, category: null, search: null };
      });
      return;
    }
    if (category !== "null")
      setFilters((prev) => ({
        ...prev,
        category,
        subCategory: null,
        search: null,
      }));
    if (subCategory !== "null")
      setFilters((prev) => ({
        ...prev,
        subCategory,
        category: null,
        search: null,
      }));

    if (search !== "null")
      setFilters((prev) => ({
        ...prev,
        subCategory: null,
        category: null,
        search,
      }));
  }, [category, subCategory, search]);
  return (
    <div className="">
      <Hero heading={"Products"} path={"Products"} />
      {/* <div className="p-10 flex items-center">
        <h5>Filters:</h5>
        <div>
          <div>
            <h6>{filters.category}</h6>
          </div>
        </div>
      </div> */}
      <div className="450px:p-10 p-5 grid grid-cols-12 relative">
        <SideBar colors={colors} setFilters={setFilters} filters={filters} />
        <div className="1000px:col-span-9 col-span-12 p-4">
          <ViewAndSort
            gridView={gridView}
            setGridView={setGridView}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          <Products
            gridView={gridView}
            filters={filters}
            setColors={setColors}
            sortBy={sortBy}
          />
        </div>
      </div>
    </div>
  );
};

export default Shop;
const ViewAndSort = ({ gridView, setGridView, sortBy, setSortBy }) => {
  const [isOpen, setIsOpen] = useState(false);
  const setSorting = (sort) => {
    setSortBy({ value: sort.value, text: sort.text });
    setIsOpen(false);
  };
  return (
    <div className="flex justify-between items-center flex-wrap gap-y-4">
      <div className="flex items-center gap-5">
        <GridView
          className={`${
            gridView && "text-primary"
          } !text-4xl transitional hover:text-primary cursor-pointer `}
          onClick={() => setGridView(true)}
        />
        <List
          className={`${
            !gridView && "text-primary"
          } !text-4xl transitional hover:text-primary cursor-pointer`}
          onClick={() => setGridView(false)}
        />
      </div>
      <div>
        <MyDropDown
          trigger={`Sort by ${sortBy.text}`}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        >
          <li
            onClick={() => setSorting({ value: "default", text: "default" })}
            className="block cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
          >
            Default
          </li>
          <li
            onClick={() => setSorting({ value: "lth", text: "Low to High" })}
            className="block cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
          >
            Low to High
          </li>
          <li
            onClick={() => setSorting({ value: "htl", text: "High to Low" })}
            className="block cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
          >
            High to Low
          </li>
        </MyDropDown>
      </div>
    </div>
  );
};
const Products = ({ gridView, filters, setColors, sortBy }) => {
  const [productsToShow, setProductsToShow] = useState([]);
  const {
    products,
    getProducts,
    fetching: fetchingProducts,
  } = useGetProducts(false);
  const {
    productsBySearch,
    getProductsBySearch,
    fetching: fetchingProductsBySearch,
  } = useGetProductsBySearch(false, filters.search);
  const [backupProducts, setBackupProducts] = useState([]);
  const {
    productsByCategory,
    getProductsByCategory,
    fetching: fetchingProductsByCategory,
  } = useGetProductsByCategory(filters.category);
  const {
    productsBySubCategory,
    getProductsBySubCategory,
    fetching: fetchingProductsBySubCategory,
  } = useGetProductsBySubCategory(filters.subCategory);

  useEffect(() => {
    const applyFilters = async () => {
      const { category, subCategory, color, search } = filters;
      if (!category && !subCategory && !search) await getProducts();
      if (category) await getProductsByCategory();
      if (subCategory) await getProductsBySubCategory();
      console.log(search);
      if (search) await getProductsBySearch();
    };
    applyFilters();
  }, [filters]);
  useEffect(() => {
    const { category, subCategory, color, price, search } = filters;
    if (products && !category && !subCategory && !search) {
      setProductsToShow(products);
      setBackupProducts(products);
    }

    if (productsByCategory && category && !subCategory && !search) {
      setProductsToShow(productsByCategory);
      setBackupProducts(productsByCategory);
    }
    if (productsBySubCategory && !category && subCategory && !search) {
      setProductsToShow(productsBySubCategory);
      setBackupProducts(productsBySubCategory);
    }
    if (productsBySubCategory && !category && subCategory && !search) {
      setProductsToShow(productsBySubCategory);
      setBackupProducts(productsBySubCategory);
    }
    if (productsBySearch && !category && !subCategory && search) {
      setProductsToShow(productsBySearch);
      setBackupProducts(productsBySearch);
    }
    if (color) {
      setProductsToShow((prev) => {
        const filtered = prev.filter((product) =>
          product.colors.includes(color)
        );
        return filtered;
      });
    }
    if (price) {
      const { min, max } = price;
      setProductsToShow((prev) => {
        const filtered = prev.filter((product) => {
          const { salePrice } = product;
          console.log(!min);
          console.log(!max);
          if (min && max) {
            return salePrice >= min && salePrice <= max;
          } else if (min && !max) {
            return salePrice >= min;
          } else if (!min && max) {
            return salePrice <= max;
          } else return true;
        });
        return filtered;
      });
    }
  }, [
    products,
    productsByCategory,
    productsBySubCategory,
    productsBySearch,
    filters,
  ]);
  useEffect(() => {
    if (sortBy.value === "default") setProductsToShow(backupProducts);
    else if (sortBy.value === "lth") {
      setProductsToShow((prev) => {
        const prevProducts = [...prev];
        const sorted = prevProducts
          .slice()
          .sort((a, b) => a.salePrice - b.salePrice);
        return [...sorted];
      });
    } else if (sortBy.value === "htl") {
      setProductsToShow((prev) => {
        const prevProducts = [...prev];
        const sorted = prevProducts
          .slice()
          .sort((a, b) => b.salePrice - a.salePrice);
        return [...sorted];
      });
    }
  }, [sortBy]);
  useEffect(() => {
    const colors = productsToShow.reduce(
      (acc, product) => [...acc, ...product.colors],
      []
    );
    setColors(colors);
  }, [productsToShow]);
  if (
    fetchingProducts ||
    fetchingProductsByCategory ||
    fetchingProductsBySubCategory ||
    fetchingProductsBySearch
  )
    return <CircularProgress className="my-10" />;
  if (
    productsToShow?.length > 0 &&
    !fetchingProducts &&
    !fetchingProductsByCategory &&
    !fetchingProductsBySubCategory &&
    !fetchingProductsBySearch
  )
    return (
      <div
        className={`${(gridView && " resp3ColGrid") || "space-y-10"}  my-10`}
      >
        {productsToShow?.map((product, index) => {
          if (gridView) return <ProductCard product={product} key={index} />;
          else return <ProductCardList product={product} key={index} />;
        })}
      </div>
    );
  else return <h2 className="my-10">No Products To Show...</h2>;
};
const SideBar = ({ colors, setFilters, filters, resetFilter }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { categories } = useGetCategories();

  return (
    <div
      className={`1000px:!col-span-3 1000px:w-full 1000px:shadow-none 1000px:p-0 1000px:border-none  1000px:static absolute z-10 1000px:bg-white bg-neutral1-700 550px:w-1/2 400px:w-3/4 w-[85%] shadow-lg top-14  p-5 1000px:min-h-max min-h-screen transitional  ${
        open ? "left-0 " : "550px:-left-1/2 400px:-left-3/4 -left-[85%]"
      }`}
    >
      <div className="relative 1000px:hidden">
        <div
          className="absolute bg-neutral1-700 shadow-md top-[50vh] left-[105%] py-4 px-2 "
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? (
            <ChevronLeft className="!text-4xl font-bold" />
          ) : (
            <ChevronRight className="!text-4xl font-bold" />
          )}
        </div>
      </div>
      <MyAccordion heading={"Categories"}>
        {categories?.map((item, index) => {
          return (
            <SidebarLink
              key={index}
              className={"group relative "}
              onClick={() => navigate(`/shop/${item._id}/null/null`)}
              text={`${item.name} (${item.products.length})`}
            >
              <ChevronRight className="!text-lg" />
              <div className="absolute top-10 left-20 pointer-events-none opacity-0  group-hover:pointer-events-auto group-hover:opacity-100 group-hover:top-5 transitional bg-white shadow p-4 z-50 min-w-max w-1/2 flex flex-col gap-4">
                {item.subCategories.map((subItem, index) => {
                  if (subItem.parentCategory === item._id)
                    return (
                      <SidebarLink
                        key={index}
                        onClick={() =>
                          navigate(`/shop/null/${subItem._id}/null`)
                        }
                        text={`${subItem.name} (${subItem.products.length})`}
                      />
                    );
                })}
              </div>
            </SidebarLink>
          );
        })}
      </MyAccordion>
      <MyAccordion heading={"Color"}>
        <div className="flex items-center gap-2">
          {colors.map((color, index) => {
            return (
              <div
                onClick={() => {
                  setFilters((prev) => {
                    if (prev.color === color) return { ...prev, color: null };
                    else return { ...prev, color };
                  });
                }}
                style={{ backgroundColor: color }}
                key={index}
                className={`${
                  filters.color === color &&
                  "shadow-md  outline-2 outline-double"
                } size-10 cursor-pointer rounded shadow text-center flex items-center justify-center `}
              >
                {filters.color === color && (
                  <Check style={{ filter: "invert(100%)" }} />
                )}
              </div>
            );
          })}
        </div>
      </MyAccordion>{" "}
      <MyAccordion heading={"Price"}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = {};
            formData.forEach((value, key) => {
              data[key] = value;
            });
            const { min, max } = data;
            if (parseInt(min) > parseInt(max)) {
              enqueueSnackbar({
                message: "Min value cannot be greater than Max value!",
                variant: "error",
              });
              return;
            }
            console.log(!min);
            if (!min && !max) {
              console.log("hey");
              setFilters((prev) => {
                return { ...prev, price: { min: 0, max: null } };
              });
              return;
            }
            setFilters((prev) => {
              return { ...prev, price: { min, max } };
            });
          }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2">
            <MyInput
              type="number"
              placeholder="Min"
              name={"min"}
              required={false}
              min={1}
            />
            -
            <MyInput
              type="number"
              placeholder="Max"
              name={"max"}
              required={false}
            />
          </div>
          <MyButton text={"Filter"} type="submit" />
        </form>
      </MyAccordion>
    </div>
  );
};
const SidebarLink = ({ children, className, text, onClick = () => {} }) => {
  return (
    <div className={`${className}`}>
      <a
        onClick={onClick}
        className={` cursor-pointer transitional hover:text-primary font-[500] text-sm`}
      >
        {text}
      </a>
      {children}
    </div>
  );
};
