import { FC } from "react";
import styled from "styled-components";
import { Stack } from "@mantine/core";
import { BottomNavBar } from "../../../components/BottomNavBar/BottomNavBar";

export const Index: FC = () => {
  return (
    <Stack align="center" justify="center" gap="8">
      <_Text>これはチャレンジです</_Text>
      <BottomNavBar currentTabNum={1} />
    </Stack>
  );
};

const _Text = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
