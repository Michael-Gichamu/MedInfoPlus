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
    console.log(selectedOption);

    if (selectedOption === "Diabetes") {
      navigate("/diabetes");
    }
    if (
      selectedOption === "All articles" ||
      selectedOption === "Fitness & Exercise"
    ) {
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
          onMouseLeave={toggleDropdown}
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
                className={`block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-blue-200 ${
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
