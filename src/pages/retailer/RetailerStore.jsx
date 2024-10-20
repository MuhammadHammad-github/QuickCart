import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./components/Sidebar";
import MyTable from "../admin/components/MyTable";
import { Add, Clear, Info, Store } from "@mui/icons-material";
import MyButton from "../../components/MyButton";
import useAddProduct from "../../hooks/highLevelHooks/products/useAddProduct";
import MyModal from "../../components/MyModal";
import MyInput from "../../components/MyInput";
import useGetCategories from "../../hooks/highLevelHooks/categories/useGetCategories";
import useGetSubCategoriesByCategory from "../../hooks/highLevelHooks/subCategories/useGetSubCategoriesByCategory";
import useGetRetailerProducts from "../../hooks/highLevelHooks/products/useGetRetailerProducts";
import useGetSeller from "../../hooks/highLevelHooks/accounts/seller/useGetSeller";
import useDeleteProduct from "../../hooks/highLevelHooks/products/useDeleteProduct";
import useUpdateProduct from "../../hooks/highLevelHooks/products/useUpdateProduct";
import useGetProduct from "../../hooks/highLevelHooks/products/useGetProduct";
import { enqueueSnackbar } from "notistack";

const RetailerStore = () => {
  const { sellerData } = useGetSeller();
  const defaultState = {
    show: false,
    type: "add",
  };
  const [open, setOpen] = useState(defaultState);
  const { retailerProducts: products, getProducts } = useGetRetailerProducts(
    sellerData?._id
  );
  const toggleProductModal = (type = "add", id) => {
    setOpen({ show: true, type, id });
  };
  return (
    <div className="grid grid-cols-12 px-10 gap-8 my-20">
      <Sidebar />
      <div className="900px:col-span-9  400px:col-span-12 350px:col-span-11 col-span-10 max-w-full  ">
        {sellerData?.allowed === false && (
          <h6 className="flex items-center gap-2 bg-primary-800 rounded-lg p-4 text-secondary">
            <Info />
            Your Store Is Not Approved Yet
          </h6>
        )}
        <AddProductModal
          open={open}
          setOpen={setOpen}
          refetch={getProducts}
          defaultState={defaultState}
        />
        <div className="flex flex-col gap-8 my-10">
          <div>
            <div className="my-10 flex items-center justify-between">
              <h3 className="">
                <Store className="!text-3xl" /> My Products
              </h3>
              <MyButton
                text={"Add Product"}
                icon={<Add />}
                onClick={() => toggleProductModal()}
                disabled={sellerData?.allowed === false}
              />
            </div>
            <MyTable
              cols={[
                "Image",
                "Product Name",
                "Product Orders",
                "Original Price",
                "Sale Price",
                "Category",
                "SubCategory",
                "Stock",
                "Colors",
                "Edit / Delete",
              ]}
            >
              {products?.map((product, index) => {
                return (
                  <ProductRow
                    product={product}
                    key={index}
                    index={index}
                    refetch={getProducts}
                    toggleProductModal={toggleProductModal}
                  />
                );
              })}
            </MyTable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetailerStore;

const ProductRow = ({ product, index, refetch, toggleProductModal }) => {
  const { deleteProduct } = useDeleteProduct(
    product._id,
    product.category._id,
    product.subCategory._id
  );
  return (
    <tr className={`${index % 2 === 0 && "bg-gray-100"} `}>
      <td className="border px-4 py-2 ">
        <img
          src={product.images[0]}
          alt="productImage"
          className="max-w-full object-contain size-12"
        />
      </td>
      <td className="border px-4 py-2 ">{product.name}</td>
      <td className="border px-4 py-2 ">{product.orders?.length}</td>
      <td className="border px-4 py-2 ">{product.originalPrice}</td>
      <td className="border px-4 py-2 ">{product.salePrice}</td>
      <td className="border px-4 py-2 ">{product.category.name}</td>
      <td className="border px-4 py-2 ">{product.subCategory.name}</td>
      <td className="border px-4 py-2 ">{product.stock}</td>
      <td className="border px-4 py-2 flex gap-2">
        {product.colors.map((color, index) => {
          return (
            <div
              style={{ backgroundColor: color }}
              key={index}
              className="size-10 cursor-pointer rounded shadow text-center flex items-center justify-center "
            ></div>
          );
        })}
      </td>
      <td className="border px-4 py-2">
        <a
          className="cursor-pointer text-primary"
          onClick={() => toggleProductModal("edit", product._id)}
        >
          Edit
        </a>
        /
        <a
          onClick={async () => {
            await deleteProduct();
            refetch();
          }}
          className="cursor-pointer text-primary"
        >
          Delete
        </a>
      </td>
    </tr>
  );
};

const AddProductModal = ({ open, setOpen, refetch, defaultState }) => {
  const { categories } = useGetCategories();
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const { subCategories } = useGetSubCategoriesByCategory(selectedCategory);
  const [selectedColors, setSelectedColors] = useState([]);
  const [currentColor, setCurrentColor] = useState("");
  const { addProduct, fetching } = useAddProduct();
  const { updateProduct, fetching: updating } = useUpdateProduct(open?.id);
  const { product } = useGetProduct(open?.id);
  const defaultFormData = {
    name: "",
    category: "",
    subCategory: "",
    originalPrice: 0,
    salePrice: 0,
    stock: 0,
    description: "",
    details: "",
  };
  const [customFormData, setCustomFormData] = useState(defaultFormData);
  console.log(product);
  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(selectedColors);
    if (selectedColors && selectedColors?.length !== 0)
      formData.append("colors", selectedColors[0] === "" ? [] : selectedColors);
    if (selectedImages.length === 0)
      return enqueueSnackbar({
        message: "Images are not uploaded!",
        variant: "error",
      });
    const fileName = "productImage";
    selectedImages.forEach((file) => {
      if (file.isFetched) {
        let extension = "";
        if (file.type === "image/png") {
          extension = ".png";
        } else if (file.type === "image/jpeg") {
          extension = ".jpg";
        } else {
          const fileTypeParts = file.type.split("/");
          extension = `.${fileTypeParts[1]}`;
        }
        const completeFileName = `${fileName}${extension}`;
        formData.append("images", file, completeFileName);
      } else formData.append("images", file);
    });
    if (open.type === "add") {
      await addProduct(formData);
    } else {
      await updateProduct(formData);
    }

    e.target.reset();
    setOpen(defaultState);
    await refetch();
  };
  const addColor = () => {
    if (!selectedColors.includes(currentColor)) {
      setSelectedColors([...selectedColors, currentColor]);
    }
  };
  const removeColor = (color) => {
    setSelectedColors(
      selectedColors.filter((selectedColor) => color !== selectedColor)
    );
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    if (
      (name === "originalPrice" &&
        Number(value) < Number(customFormData.salePrice)) ||
      (name === "salePrice" && Number(value) > customFormData.originalPrice)
    )
      return;
    setCustomFormData((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    if (!categories || categories.length === 0) return;
    setSelectedCategory(categories[0]._id);
  }, [categories]);
  useEffect(() => {
    if (!product) return;
    const {
      name,
      category,
      subCategory,
      originalPrice,
      salePrice,
      stock,
      description,
      details,
      colors,
      images,
    } = product;
    setSelectedImages(images);
    setSelectedCategory(category._id);
    setSelectedColors(colors);
    setCustomFormData({
      name,
      category: category._id,
      subCategory: subCategory._id,
      originalPrice,
      salePrice,
      stock,
      description,
      details,
    });
  }, [product]);
  return (
    <MyModal
      openType2={open}
      setOpen={setOpen}
      defaultState={defaultState}
      handleClose={() => {
        setOpen(defaultState);
        setCustomFormData(defaultFormData);
        setSelectedImages([]);
        setSelectedColors([]);
      }}
      className={
        "bg-white p-10 outline-none rounded-lg 750px:w-1/2 500px:w-3/4 w-[95%] overflow-y-auto"
      }
    >
      {open.type === "add" && <h4>Add Product</h4>}
      {open.type === "edit" && <h4>Edit Product</h4>}
      <form
        onSubmit={handleSubmitProduct}
        className="my-10 flex flex-col gap-8"
        encType="multipart/form-data"
      >
        <MyInput
          label={"Name"}
          name={"name"}
          placeholder="Enter Product Name"
          onChange={onChange}
          value={customFormData.name}
        />
        <SelectMenu
          id="category"
          name="category"
          required
          onChange={(e) => {
            setSelectedCategory(e.target.value);
          }}
          label={"Select Category"}
        >
          {categories?.map((category, index) => {
            return (
              <option value={category._id} key={index}>
                {category.name}
              </option>
            );
          })}
        </SelectMenu>
        <SelectMenu
          id="subCategory"
          name="subCategory"
          required
          label={"Select SubCategory"}
          onChange={onChange}
          value={customFormData.subCategory}
        >
          {subCategories?.map((subCategory, index) => {
            return (
              <option value={subCategory._id} key={index}>
                {subCategory.name}
              </option>
            );
          })}
        </SelectMenu>
        <p className="text-red-400 text-sm">
          Note : Original Price Cannot be lower than Sale Price.
        </p>
        <MyInput
          label={"Original Price"}
          name={"originalPrice"}
          placeholder="Enter Original Price"
          type="number"
          onChange={onChange}
          value={customFormData.originalPrice}
        />

        <MyInput
          label={"Sale Price"}
          name={"salePrice"}
          placeholder="Enter Sale Price"
          type="number"
          onChange={onChange}
          value={customFormData.salePrice}
        />
        <MyInput
          label={"Stock"}
          name={"stock"}
          placeholder="Enter Stock"
          type="number"
          onChange={onChange}
          value={customFormData.stock}
        />
        <div className="w-full flex items-center justify-between">
          <h6>Colors</h6>
          <MyButton text={"Add Color"} onClick={addColor} />
        </div>
        <MyInput
          type="color"
          required={false}
          placeholder="Select Color"
          onChange={(e) => setCurrentColor(e.target.value)}
        />
        <div className="flex gap-2 items-center">
          {selectedColors.map((color, index) => {
            return (
              <div
                style={{ backgroundColor: color }}
                key={index}
                className="size-10 cursor-pointer rounded shadow text-center flex items-center justify-center "
                onClick={() => removeColor(color)}
              >
                &times;
              </div>
            );
          })}
        </div>
        <MyInput
          label={"Description"}
          name={"description"}
          placeholder="Brief Description"
          maxLength="150"
          minLength="100"
          onChange={onChange}
          value={customFormData.description}
        />
        <MyInput
          label={"Details"}
          name={"details"}
          placeholder="Product Details"
          maxLength="2000"
          minLength="500"
          onChange={onChange}
          value={customFormData.details}
        />
        <MyInput
          label={"Image"}
          placeholder=""
          type="file"
          required={selectedImages.length === 0}
          multiple={true}
          onChange={(e) => {
            const newFiles = Array.from(e.target.files);
            setSelectedImages((prevFiles) => [...prevFiles, ...newFiles]);
          }}
        />
        <div className="flex items-center gap-2">
          {selectedImages.map((image, index) => {
            console.log(image);
            return (
              <CustomImageInput
                imgSrc={image}
                setSelectedImages={setSelectedImages}
                key={index}
                index={index}
              />
            );
          })}
        </div>
        <MyButton
          text={open.type === "add" ? "Add" : "Edit"}
          type="submit"
          loading={fetching || updating}
        />
      </form>
    </MyModal>
  );
};
const CustomImageInput = ({ setSelectedImages, imgSrc, index }) => {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState("");
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setSelectedImages((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles[index] = newFiles[0];
      return updatedFiles;
    });
  };
  const convertImageUrlToFile = async () => {
    const fileName = "productImage";
    const file = await urlToFile(imgSrc, fileName);
    setSelectedImages((prev) => {
      const updatedFiles = [...prev];
      updatedFiles[index] = file;
      return updatedFiles;
    });
  };
  useEffect(() => {
    console.log(imgSrc);
    if (typeof imgSrc === "string") {
      convertImageUrlToFile();
    }
    if (imgSrc instanceof Blob || imgSrc instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(imgSrc);
    }
  }, [imgSrc]);
  return (
    <div className="relative">
      <div
        className="flex items-center justify-center cursor-pointer"
        onClick={() => {
          setSelectedImages((prev) => {
            const updated = [...prev];
            updated.splice(index, 1);
            return updated;
          });
        }}
      >
        <Clear />
      </div>
      <img
        src={imagePreview}
        alt="Click to upload"
        className="cursor-pointer size-20 border rounded object-contain"
        onClick={handleImageClick}
      />

      {/* Hidden file input for selecting files */}
      <input
        type="file"
        multiple
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};
const SelectMenu = ({ children, label, ...rest }) => {
  return (
    <div className="max-w-full w-full mx-auto">
      <label
        for={rest.id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <select
        className="block w-full px-4 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-neutral2-400 focus:border-neutral2-400 "
        {...rest}
      >
        {children}
      </select>
    </div>
  );
};
const urlToFile = async (url, filename) => {
  const response = await fetch(url);

  const contentType = response.headers.get("content-type");
  const blob = await response.blob();

  const file = new File([blob], filename, { type: contentType });
  file.isFetched = true;
  return file;
};
