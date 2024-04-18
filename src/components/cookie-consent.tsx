import { useState } from "react";

type CookieConsentProps = {
  open: boolean;
};

function CookieConsent({ open }: CookieConsentProps) {
  const [isOpen, setIsOpen] = useState(open);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    isOpen && (
      <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white text-center py-4">
        <h2 className="text-lg font-bold mb-2">We Will Use Cookies</h2>
        <p className="text-sm mb-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <button
          className="text-gray-300 hover:text-white"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    )
  );
}

export default CookieConsent;
