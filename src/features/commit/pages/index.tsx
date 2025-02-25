import { Stack, Text } from "@mantine/core";
import { FC } from "react";
import styled from "styled-components";

const fetchMockData = () => {
  return [
    {
      id: "1",
      status: "ongoing",
      progress: 10,
      title: "ジムに5回行く！",
      deadline: "3月1日(土) 13:00",
      amount: 2000,
      description: "ジムに5回行く！",
      max_commit: 5,
      commit: 1,
    },
  ];
};

export const Index: FC = () => {
  const mockData = fetchMockData();

  const data = mockData[0];

  return (
    <_Stack>
      <>
        <Stack gap={16}>
          <Stack gap={8}>
            <Text size="xl" fw={700}>
              {data.title}
            </Text>
            <Text size="md" fw={400}>
              {data.deadline} までに
            </Text>
            <Text size="md" fw={400}>
              {data.max_commit}回
            </Text>
            <Text size="md" fw={400}>
              {data.amount}円
            </Text>
            <Text size="md" fw={400}>
              {data.description}
            </Text>
            <Text size="xl" fw={700}>
              決済方法
            </Text>
          </Stack>
        </Stack>
      </>
    </_Stack>
  );
};

const _Stack = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-top: 80px;
  padding-bottom: calc(80px + env(safe-area-inset-bottom) * 0.2);
`;
