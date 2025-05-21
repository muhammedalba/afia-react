import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
const StatCard = ({ title, value, link, color, icon }) => {
  return (
    <Link to={link} className="block">
      <div className={`bg-white overflow-hidden shadow rounded-lg ${color}`}>
        <div className="px-4 py-5 sm:p-6 text-right">
          <dt className="text-sm flex items-center justify-between font-medium text-gray-500 truncate">
            {title}
          <Icon icon={icon} width="50" height="50" color="fc4c55" />
          </dt>
          <dd className="mt-1 text-bgColor  text-3xl font-semibold text-center">{value}</dd>
        </div>
      </div>
    </Link>
  );
};
export default StatCard;
