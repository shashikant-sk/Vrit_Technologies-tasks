import CourseCard from "./components/CourseCard";
import Header from "./components/Header";
import SpecialCourseCard from "./components/SpecialCourseCard";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [CardIndex, setCardIndex] = useState(0);

  const coursesData = [
    {
      title: "All Courses",
      count: 23,
      description: "courses you're powering through right now.",
    },
    {
      title: "Upcoming Courses",
      count: 5,
      description: "exciting new courses waiting to boost your skills.",
    },
    {
      title: "Ongoing Courses",
      count: 10,
      description: "currently happening—don’t miss out on the action!",
    },
  ];

  return (
    <>
      <Header />
      <div className="flex justify-evenly items-center">
        <AnimatePresence mode="popLayout">
          {coursesData.map((course, index) => {
            const isActive = index === CardIndex; // Check if this card is active
            const direction = index > CardIndex ? 1 : -1; // Determine transition direction

            return (
              <motion.div
                key={index}
                initial={{ x: direction * 100, opacity: 0 }} // Starting position
                animate={{ x: 0, opacity: 1 }} // Animation to center
                exit={{ x: direction * -100, opacity: 0 }} // Exit animation
                transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
                onClick={() => setCardIndex(index)} // Change active card
                style={{ cursor: "pointer" }}
              >
                {isActive ? (
                  <SpecialCourseCard course={course} />
                ) : (
                  <CourseCard course={course} />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
