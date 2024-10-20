import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import MyInput from "../../components/MyInput";
import MyButton from "../../components/MyButton";
import useGetSlides from "../../hooks/highLevelHooks/slides/useGetSlides";
import useCreateSlide from "../../hooks/highLevelHooks/slides/useCreateSlide";
import useUpdateSlide from "../../hooks/highLevelHooks/slides/useUpdateSlide";
import { Delete } from "@mui/icons-material";
import useDeleteSlide from "../../hooks/highLevelHooks/slides/useDeleteSlide";
import { enqueueSnackbar } from "notistack";

const Hero = () => {
  const { slides = [], getSlides } = useGetSlides();

  return (
    <div className="grid grid-cols-12 px-10 gap-8 my-20">
      <Sidebar />
      <div className="900px:col-span-9  400px:col-span-12 350px:col-span-11 col-span-10 max-w-full  ">
        <h4 className="my-4">Customize Hero</h4>
        <SlideForm
          num={1}
          slide={slides[0]}
          getSlides={getSlides}
          slidesLength={slides?.length}
        />
        <SlideForm
          num={2}
          slide={slides[1]}
          getSlides={getSlides}
          slidesLength={slides?.length}
        />
        <SlideForm
          num={3}
          slide={slides[2]}
          getSlides={getSlides}
          slidesLength={slides?.length}
        />
      </div>
    </div>
  );
};

export default Hero;
const SlideForm = ({ num, slide, getSlides, slidesLength }) => {
  const { createSlide, fetching: creatingSlide } = useCreateSlide();
  const { updateSlide, fetching: updatingSlide } = useUpdateSlide(slide?._id);
  const { deleteSlide } = useDeleteSlide(slide?._id);
  const onCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await createSlide(formData);
    await getSlides();
  };
  const onUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const image = formData.get("image");
    if (!image || image.size === 0) {
      formData.delete("image");
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      await updateSlide(data);
    } else await updateSlide(formData);
    await getSlides();
  };
  const defaultSlideData = {
    heading: "",
    text: "",
    link: "",
  };
  const [slideData, setSlideData] = useState(defaultSlideData);
  useEffect(() => {
    if (!slide) return;
    setSlideData(slide);
  }, [slide]);
  const onChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSlideData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  return (
    <div className="my-10">
      <div className="flex items-center justify-between">
        <h5 className="my-6 underline underline-offset-4">Slide {num}</h5>
        {slide && (
          <Delete
            className="cursor-pointer"
            onClick={async () => {
              if (slidesLength > 1) {
                await deleteSlide();
                await getSlides();
                setSlideData(defaultSlideData);
              } else {
                enqueueSnackbar({
                  message: "Can not delete! At least one slide is required!",
                  variant: "error",
                });
              }
            }}
          />
        )}
      </div>
      <form
        onSubmit={!slide ? onCreate : onUpdate}
        className="flex flex-col gap-5"
        encType="multipart/form-data"
      >
        <MyInput label={"Image"} name={"image"} type="file" required={!slide} />
        {slide && (
          <div className="flex items-center w-full">
            <p>Previous Image:</p>
            <img
              src={slide.image}
              alt="slideImage"
              className="object-contain size-20 "
            />
          </div>
        )}
        <MyInput
          label={"Heading"}
          name={"heading"}
          type="text"
          onChange={onChange}
          value={slideData.heading}
        />
        <MyInput
          label={"Text"}
          name={"text"}
          type="text"
          onChange={onChange}
          value={slideData.text}
        />
        <MyInput
          label={"Link"}
          name={"link"}
          type="text"
          onChange={onChange}
          value={slideData.link}
        />
        <MyButton
          text={slide ? "Edit" : "Create"}
          loading={creatingSlide || updatingSlide}
          type="submit"
        />
      </form>
    </div>
  );
};
