import { Stack, Text } from "@mantine/core";
import { FC } from "react";
import styled from "styled-components";
import { formatDate } from "../../../util/formatDate";

const fetchMockData = () => {
  return [
    {
      challenge_id: 2,
      commits: [
        new Date("2025-02-24T00:00:00.000Z"),
        new Date("2025-02-25T00:00:00.000Z"),
      ],
      created_at: new Date("2025-02-24T00:00:00.000Z"),
      deposit: 2000,
      description:
        "2010年度〜2019年度の過去問を解く！\n得点率8割越えを目指したい。",
      end_date: new Date("2025-03-03T12:35:00.000Z"),
      refund: 0,
      status: "ongoing",
      title: "本番までに過去問10年分解く",
      max_commit: 5,
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
              {formatDate(data.end_date.toString())} までに
            </Text>
            <Text size="md" fw={400}>
              {data.max_commit}回
            </Text>
            <Text size="md" fw={400}>
              {data.deposit.toLocaleString()}円
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
