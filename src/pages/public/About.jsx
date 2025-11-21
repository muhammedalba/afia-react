import { useEffect } from "react";
import { pageTitle } from "../../helper";






const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    pageTitle(" من نحن");
  }, []);
  return (
    <div className="bg-white text-gray-800">
      About
    </div>
  );
};

export default About;
