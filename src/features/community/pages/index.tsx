import { Stack } from "@mantine/core";
import { FC } from "react";
import styled from "styled-components";

export const Index: FC = () => {
  return (
    <Stack w="100%" pt={96} pb={100}>
      <_Text>これはコミュニティです</_Text>
    </Stack>
  );
};

const _Text = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
