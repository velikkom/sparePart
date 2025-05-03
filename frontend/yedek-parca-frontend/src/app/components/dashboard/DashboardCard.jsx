import Link from "next/link";
import iconMap from "@/helpers/data/iconMap";

const DashboardCard = ({ title, description, route, icon }) => {
  return (
    <Link href={route}>
      <div className="p-6 border rounded-lg shadow-lg hover:shadow-2xl cursor-pointer transition-all bg-white w-72 text-center hover:scale-105">
        <div className="flex justify-center text-blue-500 mb-4">
          {iconMap[icon]}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </Link>
  );
};

export default DashboardCard;
