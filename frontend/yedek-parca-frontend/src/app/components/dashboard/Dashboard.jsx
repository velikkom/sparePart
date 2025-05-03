
import dashboardCards from "@/helpers/data/dashboardCard";
import DashboardCard from "./DashboardCard";


const Dashboard = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-8 justify-items-center">
          {dashboardCards.map((card) => (
            <DashboardCard
              key={card.title}
              title={card.title}
              description={card.description}
              route={card.route}
              icon={card.icon}
            />
          ))}
        </div>
      );
};

export default Dashboard;
