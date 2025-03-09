import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { Button } from "primereact/button";

const SocialMediaButtons = () => {
  return (
    <div className="flex justify-center gap-4 my-6 space-x-4 mt-4">
      <Button className="p-4 rounded-full bg-white border shadow-md hover:bg-gray-100">
        <FontAwesomeIcon icon={faFacebookF} className="text-gray-600 w-5 h-5" />
      </Button>
      <Button className="p-4 rounded-full bg-white border shadow-md hover:bg-gray-100">
        <FontAwesomeIcon icon={faGoogle} className="text-gray-600 w-5 h-5" />
        </Button>
        <Button className="p-4 rounded-full bg-white border shadow-md hover:bg-gray-100">
        <FontAwesomeIcon icon={faLinkedinIn} className="text-gray-600 w-5 h-5" />
        </Button>
    </div>
  );
};

export default SocialMediaButtons;
