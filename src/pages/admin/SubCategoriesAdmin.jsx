import React, { useEffect, useState } from "react";
import useCreateSubCategory from "../../hooks/highLevelHooks/subCategories/useCreateSubCategory";
import MyModal from "../../components/MyModal";
import MyInput from "../../components/MyInput";
import MyButton from "../../components/MyButton";
import MyTable from "./components/MyTable";
import useGetCategories from "../../hooks/highLevelHooks/categories/useGetCategories";
import Sidebar from "./components/Sidebar";
import useGetSubCategories from "../../hooks/highLevelHooks/subCategories/useGetSubCategories";
import { Add, Category } from "@mui/icons-material";
import useDeleteSubCategory from "../../hooks/highLevelHooks/subCategories/useDeleteSubCategory";
import { useNavigate, useParams } from "react-router-dom";
import useGetOneSubCategory from "../../hooks/highLevelHooks/subCategories/useGetOneSubCategory";
import useUpdateSubCategory from "../../hooks/highLevelHooks/subCategories/useUpdateSubCategory";

const SubCategoriesAdmin = () => {
  const { category } = useParams();
  const [defaultStateSubCat, setDefaultStateSubCat] = useState({
    show: false,
    type: "add",
  });
  const { subCategories, getSubCategories } = useGetSubCategories();
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);

  const [openSubCategory, setOpenSubCategory] = useState(defaultStateSubCat);
  const toggleSubCategoryModal = (id, type = "add") => {
    setOpenSubCategory({ show: true, type, id });
  };

  useEffect(() => {
    if (category === "null" || !subCategories || subCategories.length === 0)
      return;
    const filteredSubCats = subCategories.filter((item) => {
      return item.parentCategory === category;
    });
    setFilteredSubCategories(filteredSubCats);
  }, [subCategories]);
  return (
    <div className="grid grid-cols-12 400px:px-10 px-2 gap-8 my-20 ">
      <Sidebar />
      <div className="900px:col-span-9 400px:col-span-12 350px:col-span-11 col-span-10 max-w-full ">
        <AddSubCategoryModal
          openSubCategory={openSubCategory}
          setOpenSubCategory={setOpenSubCategory}
          getSubCategories={getSubCategories}
          defaultState={defaultStateSubCat}
        />

        <div className="my-10 flex 600px:flex-row flex-col gap-y-4 600px:items-center justify-between">
          <h3 className="">
            <Category className="!text-3xl" /> SubCategories
          </h3>
          <MyButton
            text={"Add SubCategory"}
            icon={<Add />}
            onClick={() => toggleSubCategoryModal()}
          />
        </div>
        <SubCategoriesTable
          subCategories={
            category === "null" ? subCategories : filteredSubCategories
          }
          getSubCategories={getSubCategories}
          toggleSubCategoryModal={toggleSubCategoryModal}
        />
      </div>
    </div>
  );
};

export default SubCategoriesAdmin;

const AddSubCategoryModal = ({
  openSubCategory,
  setOpenSubCategory,
  getSubCategories,
  defaultState,
}) => {
  const { categories } = useGetCategories();
  const { subCategory } = useGetOneSubCategory(openSubCategory?.id);
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const { updateSubCategory } = useUpdateSubCategory(openSubCategory?.id);
  const { createSubCategory } = useCreateSubCategory();
  const handleSubmitSubCategory = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (openSubCategory.type === "add") {
      await createSubCategory(formData);
    } else {
      const data = {};
      const imageFile = formData.get("image");
      if (imageFile.size === 0) {
        formData.delete("image");
        formData.forEach((value, key) => {
          data[key] = value;
        });
        await updateSubCategory(data);
      } else {
        formData.append("parentCategory", parentCategory);
        console.log(formData.get("parentCategory"));
        await updateSubCategory(formData);
      }
    }

    e.target.reset();
    setName("");
    setOpenSubCategory(defaultState);
    await getSubCategories();
  };
  useEffect(() => {
    if (openSubCategory.type === "add") {
      setName("");
      return;
    }
    if (!subCategory) return;
    if (openSubCategory.type === "edit") {
      setName(subCategory.name);
      setParentCategory(subCategory?.parentCategory);
    }
  }, [subCategory]);
  useEffect(() => {
    if (!categories) return;
    if (openSubCategory.type === "add") {
      setParentCategory(categories[0]?._id);
    }
  }, [categories]);
  return (
    <MyModal
      openType2={openSubCategory}
      setOpen={setOpenSubCategory}
      handleClose={() => {
        setName("");
        setOpenSubCategory(defaultState);
      }}
      className={
        "bg-white p-10 outline-none rounded-lg 750px:w-1/2 500px:w-3/4 w-[95%] overflow-y-auto"
      }
    >
      {openSubCategory.type === "add" && <h4>Add SubCategory</h4>}
      {openSubCategory.type === "edit" && <h4>Edit SubCategory</h4>}
      <form
        onSubmit={handleSubmitSubCategory}
        className="my-10 flex flex-col gap-8"
        encType="multipart/form-data"
      >
        <MyInput
          label={"Name"}
          name={"name"}
          placeholder="e.g: Shoes"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <div class="max-w-full w-full mx-auto">
          <label
            for="subCategories"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select an option
          </label>
          <select
            id="subCategories"
            name="parentCategory"
            class="block w-full px-4 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-neutral2-400 focus:border-neutral2-400"
            required
            disabled={openSubCategory.type === "edit"}
            value={parentCategory}
            onChange={(e) => {
              setParentCategory(e.target.value);
            }}
          >
            {categories?.map((category, index) => {
              return (
                <option key={index} value={category._id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>

        <MyInput
          label={"Image"}
          name={"image"}
          placeholder=""
          type="file"
          required={openSubCategory.type === "add"}
        />
        <MyButton
          text={openSubCategory.type === "add" ? "Add" : "Edit"}
          type="submit"
        />
      </form>
    </MyModal>
  );
};
const SubCategoriesTable = ({
  subCategories,
  getSubCategories,
  toggleSubCategoryModal,
}) => {
  return (
    <MyTable cols={["Image", "Name", "Products", "Edit / Delete"]}>
      {subCategories?.map((subCategory, index) => {
        return (
          <SubCategoryRow
            subCategory={subCategory}
            key={index}
            getSubCategories={getSubCategories}
            toggleSubCategoryModal={toggleSubCategoryModal}
          />
        );
      })}
    </MyTable>
  );
};
const SubCategoryRow = ({
  subCategory,
  getSubCategories,
  toggleSubCategoryModal,
  index,
}) => {
  const navigate = useNavigate();
  const { deleteSubCategory } = useDeleteSubCategory(
    subCategory._id,
    subCategory.parentCategory
  );
  return (
    <tr className={`${index % 2 === 0 && "bg-gray-100"}`}>
      <td className="border px-4 py-2">
        <img
          src={subCategory.image}
          alt="categoryImage"
          className="max-w-full object-contain size-12"
        />
      </td>
      <td className="border px-4 py-2">{subCategory.name}</td>
      <td className="border px-4 py-2">
        <a
          onClick={() => {
            navigate(`/admin/products/null/${subCategory._id}/null`);
          }}
          className="cursor-pointer text-primary"
        >
          View Products
        </a>
      </td>

      <td className="border px-4 py-2">
        <a
          onClick={() => toggleSubCategoryModal(subCategory._id, "edit")}
          className="cursor-pointer text-primary"
        >
          Edit
        </a>
        /
        <a
          onClick={async () => {
            await deleteSubCategory();
            getSubCategories();
          }}
          className="cursor-pointer text-primary"
        >
          Delete
        </a>
      </td>
    </tr>
  );
};
