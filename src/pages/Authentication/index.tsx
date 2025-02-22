import { FC } from "react";
import { Index } from "../../features/authentication/pages";
import { DefaultLayout } from "../../components/Layout/DefaultLayout";

export const Authentication: FC = () => {
  return (
    <DefaultLayout>
      <Index />
    </DefaultLayout>
  );
};
