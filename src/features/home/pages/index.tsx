import { FC } from "react";
import styled from "styled-components";
import { BottomNavBar } from "../../../components/BottomNavBar/BottomNavBar";
import { Header } from "../../../components/Header/Header";

export const Index: FC = () => {
  return (
    <_Container>
      <Header />
      <_Text>これはホームです</_Text>
      <BottomNavBar currentTabNum={0} />
    </_Container>
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

const _Text = styled.div`
  height: 1000px;
  font-size: 20px;
  font-weight: bold;
`;
