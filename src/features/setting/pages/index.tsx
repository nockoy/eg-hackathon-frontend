import { FC } from "react";
import styled from "styled-components";
import { useAuth } from "../../../hooks/useAuth";
import { Stack } from "@mantine/core";
import { BottomNavBar } from "../../../components/BottomNavBar/BottomNavBar";
import { Header } from "../../../components/Header/Header";

export const Index: FC = () => {
  const { signOut } = useAuth();

  return (
    <Stack align="center" justify="center" gap="8" w="100%">
      <Header />
      <_Text>これは設定です</_Text>
      <_Button onClick={signOut}>ログアウト</_Button>
      <BottomNavBar currentTabNum={2} />
    </Stack>
  );
};

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
