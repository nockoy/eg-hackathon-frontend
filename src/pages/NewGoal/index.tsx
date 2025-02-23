import { FC } from "react";
import { Index } from "../../features/newGoal/pages";
import { DefaultLayout } from "../../components/Layout/DefaultLayout";

export const NewGoal: FC = () => {
  return (
    <DefaultLayout>
      <Index />
    </DefaultLayout>
  );
};
