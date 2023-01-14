import Microsoft from "../svg/oauth/Microsoft";

const MicrosoftButton = () => {
  return (
    <button
      className="hover:bg-gray-750 relative inline-flex items-center justify-center rounded-md border border-gray-700 bg-gray-800 px-6 py-3 text-lg font-medium text-white shadow-sm hover:text-gray-100"
      type="button"
    >
      <span className="flex items-center">
        <span className="sr-only">Sign in with</span>
        <Microsoft />
        <span>Microsoft</span>
      </span>
    </button>
  );
};

export default MicrosoftButton;
