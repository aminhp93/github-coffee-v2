import dynamic from "next/dynamic";

const AppBuilder = dynamic(() => import("@/features/app-builder/AppBuilder"), {
  ssr: false,
});

const AppBuilderPage = () => {
  return <AppBuilder />;
};

export default AppBuilderPage;
