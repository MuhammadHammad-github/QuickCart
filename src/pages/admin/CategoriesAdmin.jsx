import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import MyTable from "./components/MyTable";
import { Add, Category } from "@mui/icons-material";
import MyModal from "../../components/MyModal";
import MyInput from "../../components/MyInput";
import MyButton from "../../components/MyButton";
import useCreateSubCategory from "../../hooks/highLevelHooks/subCategories/useCreateSubCategory";
import useCreateCategory from "../../hooks/highLevelHooks/categories/useCreateCategory";
import useGetCategories from "../../hooks/highLevelHooks/categories/useGetCategories";
import useDeleteCategory from "../../hooks/highLevelHooks/categories/useDeleteCategory";
import { useNavigate } from "react-router-dom";
import useGetOneCategory from "../../hooks/highLevelHooks/categories/useGetOneCategory";
import useUpdateCategory from "../../hooks/highLevelHooks/categories/useUpdateCategory";
import { CircularProgress } from "@mui/material";

const CategoriesAdmin = () => {
  const { categories, getCategories, fetching } = useGetCategories();
  const defaultStateCat = { show: false, type: "add" };
  const defaultStateSubCat = {
    show: false,
    catId: null,
  };
  const [openSubCategory, setOpenSubCategory] = useState(defaultStateSubCat);
  const [openCategory, setOpenCategory] = useState(defaultStateCat);

  const toggleSubCategoryModal = (id) => {
    setOpenSubCategory({ show: true, catId: id });
  };
  const toggleCategoryModal = (id = null, type = "add") => {
    setOpenCategory({ show: true, type, id });
  };

  return (
    <div className="grid grid-cols-12 px-10 gap-8 my-20">
      <Sidebar />
      <div className="900px:col-span-9  400px:col-span-12 350px:col-span-11 col-span-10 max-w-full ">
        <AddCategoryModal
          open={openCategory}
          setOpen={setOpenCategory}
          refetch={getCategories}
          defaultState={defaultStateCat}
        />
        <AddSubCategoryModal
          categories={categories}
          defaultStateSubCat={defaultStateSubCat}
          openSubCategory={openSubCategory}
          setOpenSubCategory={setOpenSubCategory}
        />
        <div className="my-10 flex items-center justify-between">
          <h3 className="">
            <Category className="!text-3xl" /> Categories
          </h3>
          <MyButton
            text={"Add Category"}
            icon={<Add />}
            onClick={() => toggleCategoryModal()}
          />
        </div>
        {fetching ? (
          <CircularProgress />
        ) : (
          <CategoriesTable
            categories={categories}
            toggleSubCategoryModal={toggleSubCategoryModal}
            refetch={getCategories}
            toggleCategoryModal={toggleCategoryModal}
          />
        )}
      </div>
    </div>
  );
};

export default CategoriesAdmin;
const AddCategoryModal = ({ open, setOpen, refetch, defaultState }) => {
  const [name, setName] = useState("");
  const { createCategory, fetching: creating } = useCreateCategory();
  const { updateCategory, fetching: updating } = useUpdateCategory(open.id);
  const { category } = useGetOneCategory(open?.id);
  console.log(open?.id);
  console.log(category);
  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (open.type === "add") {
      await createCategory(formData);
    } else {
      const data = {};
      const imageFile = formData.get("image");
      if (imageFile.size === 0) {
        formData.delete("image");
        formData.forEach((value, key) => {
          data[key] = value;
        });
        await updateCategory(data);
      } else await updateCategory(formData);
      e.target.reset();
    }

    await refetch();
    setName("");
    setOpen(defaultState);
  };
  useEffect(() => {
    console.log(open.type);
    if (open.type === "add") {
      setName("");
      return;
    }
    if (!category) return;
    if (open.type === "edit") setName(category.name);
  }, [category]);
  return (
    <MyModal
      // open={open}
      openType2={open}
      setOpen={setOpen}
      defaultState={defaultState}
      handleClose={() => {
        setName("");
        setOpen(defaultState);
      }}
      className={
        "bg-white p-10 outline-none rounded-lg 750px:w-1/2 500px:w-3/4 w-[95%] overflow-y-auto"
      }
    >
      {open.type === "add" && <h4>Add Category</h4>}
      {open.type === "edit" && <h4>Edit Category</h4>}
      <form
        onSubmit={handleSubmitCategory}
        className="my-10 flex flex-col gap-8"
        encType="multipart/form-data"
      >
        <MyInput
          label={"Name"}
          name={"name"}
          placeholder="e.g: Electronics"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        {console.log(category?.name)}
        <MyInput
          label={"Image"}
          name={"image"}
          placeholder=""
          type="file"
          required={open.type === "add"}
        />
        <MyButton
          text={open.type === "add" ? "Add" : "Edit"}
          type="submit"
          loading={creating || updating}
        />
      </form>
    </MyModal>
  );
};
const AddSubCategoryModal = ({
  openSubCategory,
  setOpenSubCategory,
  defaultStateSubCat,
  categories,
}) => {
  const { createSubCategory, fetching } = useCreateSubCategory();
  const handleAddSubCategory = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await createSubCategory(formData);
    setOpenSubCategory({ show: false, catId: null });
  };
  return (
    <MyModal
      openType2={openSubCategory}
      setOpen={setOpenSubCategory}
      defaultState={defaultStateSubCat}
      className={
        "bg-white p-10 outline-none rounded-lg 750px:w-1/2 500px:w-3/4 w-[95%] overflow-y-auto"
      }
    >
      <h4>Add SubCategory</h4>
      <form
        onSubmit={handleAddSubCategory}
        className="my-10 flex flex-col gap-8"
        enctype="multipart/form-data"
      >
        <MyInput label={"Name"} name={"name"} placeholder="e.g: Shoes" />
        <div class="max-w-full w-full mx-auto">
          <label
            for="categories"
            class="block text-sm font-medium text-gray-700 mb-2"
          >
            Select an option
          </label>
          <select
            id="categories"
            name="parentCategory"
            className="block w-full px-4 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-neutral2-400 focus:border-neutral2-400 pointer-events-none"
            value={openSubCategory.catId}
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
          required
        />
        <MyButton text={"Add"} type="submit" loading={fetching} />
      </form>
    </MyModal>
  );
};
const CategoriesTable = ({
  categories,
  toggleSubCategoryModal,
  refetch,
  toggleCategoryModal,
}) => {
  return (
    <MyTable
      cols={[
        "Image",
        "Name",
        "Products",
        "Sub Categories",
        "Add SubCategory",
        "Edit/Delete",
      ]}
    >
      {categories?.map((category, index) => {
        return (
          <CategoryRow
            key={index}
            category={category}
            index={index}
            refetch={refetch}
            toggleSubCategoryModal={toggleSubCategoryModal}
            toggleCategoryModal={toggleCategoryModal}
          />
        );
      })}
    </MyTable>
  );
};
const CategoryRow = ({
  category,
  index,
  refetch,
  toggleSubCategoryModal,
  toggleCategoryModal,
}) => {
  const { deleteCategory, fetching } = useDeleteCategory(category._id);
  const navigate = useNavigate();
  return (
    <tr className={`${index % 2 === 0 && "bg-gray-100"}`}>
      <td className="border px-4 py-2">
        <img
          loading="lazy"
          src={category.image}
          alt="categoryImage"
          className="max-w-full object-contain size-12"
        />
      </td>
      <td className="border px-4 py-2">{category.name}</td>
      <td className="border px-4 py-2">
        <a
          onClick={() => {
            navigate(`/admin/products/${category._id}/null/null`);
          }}
          className="cursor-pointer text-primary"
        >
          View Products
        </a>
      </td>
      <td className="border px-4 py-2">
        <a
          onClick={() => {
            navigate(`/admin/subCategories/${category._id}`);
          }}
          className="cursor-pointer text-primary"
        >
          View SubCategories
        </a>
      </td>
      <td className="border px-4 py-2">
        <a
          onClick={() => toggleSubCategoryModal(category._id)}
          className="cursor-pointer text-primary"
        >
          Add SubCategory
        </a>
      </td>
      <td className="border px-4 py-2">
        <a
          onClick={() => toggleCategoryModal(category._id, "edit")}
          className="cursor-pointer text-primary"
        >
          Edit
        </a>
        /
        <a
          onClick={async () => {
            if (fetching) return;
            await deleteCategory();
            refetch();
          }}
          className="cursor-pointer text-primary"
        >
          {fetching ? <CircularProgress /> : "Delete"}
        </a>
      </td>
    </tr>
  );
};
