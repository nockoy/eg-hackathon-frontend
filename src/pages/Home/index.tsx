import { FC } from "react";
import { Index } from "../../features/home/pages";
import { DefaultLayout } from "../../components/Layout/DefaultLayout";
import { Header } from "../../components/Header/Header";
import { BottomNavBar } from "../../components/BottomNavBar/BottomNavBar";
import styled from "styled-components";

export const Home: FC = () => {
  return (
    <DefaultLayout>
      <Header />
      <_Container>
        <Index />
      </_Container>
      <BottomNavBar currentTabNum={0} />
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
  padding-top: 92px;
  padding-bottom: 200px;
`;
