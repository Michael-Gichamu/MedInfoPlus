import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomDropdown = ({
  title,
  options,
}: {
  title: string;
  options: Array<string>;
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    console.log(option);

    if (option === "Diabetes") {
      navigate("/resource/4c796d29-01c1-4c9f-88ac-a5bcc3b91a94");
    }
    if (option === "Fitness & Exercise") {
      navigate("/resource/83552b25-4559-4bb2-8ccb-a5508dfce408");
    }
    if (option === "Allergies") {
      navigate("/resource/76082aba-4480-4b0e-8775-2da3a3a25dd8");
    }
    if (option === "All articles") {
      navigate("/articles");
    }
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring focus:ring-blue-200"
          onClick={toggleDropdown}
        >
          {title}
          <svg
            className={`w-5 h-5 ml-2 transition-transform transform ${
              isOpen ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-300 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option) => (
              <button
                key={option}
                type="button"
                className={`block w-full  relative px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-blue-200 ${
                  option === selectedOption ? "bg-blue-100" : ""
                }`}
                role="menuitem"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
