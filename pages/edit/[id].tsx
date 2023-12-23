import dynamic from "next/dynamic";

const LegacyLayout = dynamic(() => import("@/features/layout/LegacyLayout"), {
  ssr: false,
});

const Edit = dynamic(() => import("@/features/edit/Edit"), {
  ssr: false,
});

const EditPage = () => {
  return <Edit />;
};

EditPage.getLayout = (page: React.ReactNode) => (
  <LegacyLayout>{page}</LegacyLayout>
);

export default EditPage;
