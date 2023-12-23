import dynamic from "next/dynamic";

const Dashboard = dynamic(() => import("@/features/dashboard/Dashboard"), {
  ssr: false,
});

const LegacyLayout = dynamic(() => import("@/features/layout/LegacyLayout"), {
  ssr: false,
});

const DashboardPage = () => {
  return <Dashboard />;
};

DashboardPage.getLayout = (page: React.ReactNode) => (
  <LegacyLayout>{page}</LegacyLayout>
);

export default DashboardPage;
