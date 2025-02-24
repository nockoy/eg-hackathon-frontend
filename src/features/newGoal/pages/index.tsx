import { Button, Stack, Textarea, TextInput } from "@mantine/core";
import { FC } from "react";
import styled from "styled-components";

export const Index: FC = () => {
  return (
    <_Stack>
      <Stack gap={16}>
        <TextInput
          type="text"
          placeholder="例）1週間後までに2回ジムに行く！"
          label="タイトル"
          radius="8px"
        />
        <TextInput
          type="text"
          placeholder="例）3月1日(土) 13:00"
          label="期限"
          radius="8px"
        />
        <TextInput
          type="number"
          placeholder="例）2"
          label="回数"
          radius="8px"
        />
        <TextInput
          type="number"
          placeholder="例）2,000"
          label="金額"
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
        次へ
      </Button>
    </_Stack>
  );
};

const _Stack = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-top: 80px;
  padding-bottom: calc(80px + env(safe-area-inset-bottom) * 0.25);
`;
