import { FC } from "react";
import styled from "styled-components";
import { useAuth } from "../../../hooks/useAuth";
import { BottomNavBar } from "../../../components/BottomNavBar/BottomNavBar";
import { Header } from "../../../components/Header/Header";

export const Index: FC = () => {
  const { signOut } = useAuth();

  return (
    <_Container>
      <Header />
      <_Text>これは設定です</_Text>
      <_Button onClick={signOut}>ログアウト</_Button>
      <BottomNavBar currentTabNum={2} />
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
  font-size: 20px;
  font-weight: bold;
`;

const _Button = styled.div`
  background-color: #3400c2;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;
