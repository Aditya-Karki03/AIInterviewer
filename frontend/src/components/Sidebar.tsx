import { Link } from "react-router-dom";

const Sidebar = () => {
  const sideBarInfos = ["Dashboard", "Practice", "Sessions", "Settings"];
  return (
    <div className="min-h-screen w-1/5 bg-gray-900 text-white flex flex-col shadow-lg">
      {/* Logo / Header */}
      <div className="p-4 text-xl font-bold border-b border-gray-700">
        AI Interviewer
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2 p-4">
          {sideBarInfos.map((info) => (
            <li key={info}>
              <Link
                to={`/${info.toLowerCase()}`}
                className="block rounded-lg px-3 py-2 hover:bg-gray-700 transition"
              >
                {info}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <button className="w-full rounded-lg bg-gray-800 px-3 py-2 hover:bg-gray-700 transition">
          Logout
        </button>
      </div>
    </div>
  );
};
export default Sidebar;
