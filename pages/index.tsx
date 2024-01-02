import dynamic from "next/dynamic";

const Dashboard = dynamic(() => import("@/features/dashboard"), {
  ssr: false,
});

const HomePage = () => {
  return <Dashboard />;
};

export default HomePage;
