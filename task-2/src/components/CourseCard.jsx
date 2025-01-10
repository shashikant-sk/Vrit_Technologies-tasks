import CCCss from "./Css/CourseCard.module.css";

const CourseCard = ({ course, index, onClick}) => {
  const { bgColor } = course;
  return (
    <div
      id={CCCss.mDiv}
      className="flex flex-col justify-center items-center bg-[#f8e9e9] m-0"
    >
      <div
        className="flex flex-col w-[300px] h-[500px] bg-[#fdecec] rounded-[20px] p-5 relative text-left"
        onClick={() => onClick(index)}
        style={{ cursor: "pointer" }}
      >
        <div className="absolute left-[140px] top-1/2 origin-left transform -rotate-90">
          <div className="font-bold text-2xl text-[#b41e2d] uppercase">
            {course.title}
          </div>
          <div className="text-sm text-[#b41e2d] mt-2">
            {course.description}
          </div>
        </div>
        <div className="absolute bottom-[30px] left-5 flex items-end">
          <p className="font-bold text-[120px] text-[#b41e2d] leading-none">
            {course.count}
          </p>
          <span className="text-6xl font-bold text-[#b41e2d] ml-2 align-super position: relative mb-12">
            +
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
