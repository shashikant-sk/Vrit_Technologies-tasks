import React from "react";
import ReactIcon from "/ReactIcon.jpg";
import VueIcon from "/VueIcon.jpg";
import HashtagIcon from "/HashtagIcon.jpg";
import PenIcon from "/PenIcon.jpg";
import CCCss from "./Css/CourseCard.module.css";

const SpecialCourseCard = ({ course, index, onClick }) => {
  return (
    <div
      id={CCCss.cDiv}
      className="relative flex flex-col justify-center gap-4 bg-red-700 rounded-3xl shadow-lg cursor-pointer transition-all duration-300 hover:bg-red-600 w-[400px] h-[300px] p-6"
      onClick={() => onClick(index)}
    >
      <div className="absolute top-5 right-5 flex items-center gap-2 text-white">
        <p className="text-sm font-semibold">View all Courses</p>
        <span className="text-sm font-semibold">→</span>
      </div>

      <div className="flex items-center gap-4 absolute top-12 left-5">
        <img
          src={ReactIcon}
          alt="React Icon"
          className="w-[40px] h-[40px] transition-transform hover:scale-110"
        />
        <img
          src={HashtagIcon}
          alt="Hashtag Icon"
          className="w-[40px] h-[40px] transition-transform hover:scale-110"
        />
        <img
          src={VueIcon}
          alt="Vue Icon"
          className="w-[40px] h-[40px] transition-transform hover:scale-110"
        />
        <img
          src={PenIcon}
          alt="Pen Icon"
          className="w-[40px] h-[40px] transition-transform hover:scale-110"
        />
      </div>

      <div className="absolute bottom-8 left-5 flex items-end">
        <div className="flex font-bold text-white leading-none">
          <p className="text-[120px]">{course.count}</p>
          <span className="text-6xl font-bold text-white ml-2 align-super mb-3">
            +
          </span>
        </div>

        <div className="text-white ml-5 mb-5">
          <p className="text-2xl font-semibold">{course.title}</p>
          <p className="text-lg mt-2">{course.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SpecialCourseCard;
