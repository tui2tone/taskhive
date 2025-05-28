const Navbar = () => {
  return (
    <div className="w-full border-b border-gray-100 bg-white">
      <div className="container mx-auto px-4 w-full max-w-screen-lg h-[80px] flex items-center justify-center">
        {/* Logo */}
        <a href="/">
          <div className="text-2xl font-bold">
            <span className="text-yellow-500">Task</span>
            <span>Hive</span>
          </div>
        </a>
        <div className="flex-1"></div>
        <div className="flex items-center justify-center gap-2">
          <img
            src="/images/avatar.jpg"
            className="w-12 h-12 rounded-full border border-yellow-100"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
