import { FC } from "react";
import styled from "styled-components";
import { DefaultLayout } from "../../components/Layout/DefaultLayout";
import { Stack } from "@mantine/core";

export const NotFound: FC = () => {
  return (
    <DefaultLayout>
      <Stack align="center" justify="center" gap="8">
        <_Text>NotFound</_Text>
      </Stack>
    </DefaultLayout>
  );
};

const _Text = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
