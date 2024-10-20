import { ChevronRight } from "@mui/icons-material";

const NextArrow = ({ onClick, myClassName }) => {
  return (
    <div
      className={`${myClassName} hover:bg-primary hover:text-white transitional p-1 rounded-lg absolute top-1/2 -translate-y-1/2 right-10 z-10 cursor-pointer text-white bg-secondary opacity-0 group-hover:opacity-100 group-hover:right-5`}
      onClick={onClick}
    >
      <ChevronRight className="!font-bold !text-4xl" />
    </div>
  );
};
export default NextArrow;
