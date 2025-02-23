import { FC } from "react";
import { Index } from "../../features/challenge/pages";
import { DefaultLayout } from "../../components/Layout/DefaultLayout";

export const Challenge: FC = () => {
  return (
    <DefaultLayout>
      <Index />
    </DefaultLayout>
  );
};
