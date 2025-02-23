import { FC } from "react";
import { Index } from "../../features/home/pages";
import { DefaultLayout } from "../../components/Layout/DefaultLayout";
import { Header } from "../../components/Header/Header";
import { BottomNavBar } from "../../components/BottomNavBar/BottomNavBar";
import styled from "styled-components";

export const Home: FC = () => {
  return (
    <DefaultLayout>
      <_Container>
        <Header />
        <Index />
        <BottomNavBar currentTabNum={0} />
      </_Container>
    </DefaultLayout>
  );
};

const _Container = styled.div`
  width: 100%;
  max-width: 480px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 92px;
`;
