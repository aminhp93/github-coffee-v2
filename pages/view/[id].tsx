import dynamic from "next/dynamic";

const LegacyLayout = dynamic(() => import("@/features/layout/LegacyLayout"), {
  ssr: false,
});

const View = dynamic(() => import("@/features/view/View"), {
  ssr: false,
});

const ViewPage = () => {
  return <View />;
};

ViewPage.getLayout = (page: React.ReactNode) => (
  <LegacyLayout>{page}</LegacyLayout>
);

export default ViewPage;
