import FireIcon from "/fire.jpg";

const Header = () => {
  return (
    <div className="flex flex-row items-center px-8 py-12">
      <div className="text-base flex flex-col gap-4">
        <h1>Explore our classes and master trending skills!</h1>
        <div className="flex flex-row gap-2 items-center font-bold text-lg">
          <h1>Dive Into </h1>
          <span className="text-green-500">What&apos;s Hot Right Now!</span>
          <img src={FireIcon} alt="Fire Emoji" className="h-8 w-7" />
        </div>
      </div>
      
    </div>
  );
};

export default Header;
