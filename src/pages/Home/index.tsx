import { FC } from "react";
import { Index } from "../../features/home/pages";
import { DefaultLayout } from "../../components/Layout/DefaultLayout";

export const Home: FC = () => {
  return (
    <DefaultLayout>
      <Index />
    </DefaultLayout>
  );
};
