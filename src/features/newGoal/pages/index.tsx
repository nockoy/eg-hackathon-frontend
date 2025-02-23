import { Button, Stack, Textarea, TextInput } from "@mantine/core";
import { FC } from "react";
import styled from "styled-components";

export const Index: FC = () => {
  return (
    <_Stack gap={32} w="100%" pt={96} pb={100}>
      <Stack gap={16}>
        <TextInput
          type="text"
          placeholder="タイトルを入力"
          label="タイトル"
          radius="8px"
        />
        <Textarea
          label="やること"
          placeholder="目標をしっかりと書こう"
          autosize
          minRows={3}
        />
      </Stack>
      <Button
        variant="light"
        radius="xl"
        size="md"
        pr={14}
        h={48}
        styles={{ section: { marginLeft: 22 } }}
      >
        作成
      </Button>
    </_Stack>
  );
};

const _Stack = styled(Stack)`
  width: 100%;
  padding: 0 32px;
`;
