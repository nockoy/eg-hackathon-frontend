import { FC } from "react";
import { Index } from "../../features/community/pages";
import { DefaultLayout } from "../../components/Layout/DefaultLayout";
import { Header } from "../../components/Header/Header";
import { BottomNavBar } from "../../components/BottomNavBar/BottomNavBar";
import styled from "styled-components";

export const Community: FC = () => {
  return (
    <DefaultLayout>
      <Header />
      <_Container>
        <Index />
      </_Container>
      <BottomNavBar currentTabNum={2} />
    </DefaultLayout>
  );
};

const _Container = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
`;
