import { Stack, Text } from "@mantine/core";
import { FC } from "react";
import styled from "styled-components";
import { Card } from "../components/Card";
import { useNavigate } from "react-router-dom";

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
    {
      id: "2",
      status: "ongoing",
      progress: 60,
      title: "本番までに過去問10年分解く",
      deadline: "3月1日(土) 13:00",
      amount: 2000,
      description:
        "2010年度〜2019年度の過去問を解く！\n得点率8割越えを目指したい。",
      max_commit: 10,
      commit: 5,
    },
    {
      id: "3",
      status: "completed",
      progress: 80,
      title: "毎日英単語を50個覚える",
      deadline: "3月15日(日) 18:00",
      amount: 1500,
      description: "毎日50個の英単語を覚えて、語彙力を強化する。",
      max_commit: 10,
      commit: 8,
    },
  ];
};

export const Index: FC = () => {
  const mockData = fetchMockData();
  const ongoingData = mockData.filter((item) => item.status === "ongoing");
  const completedData = mockData.filter((item) => item.status === "completed");
  const navigate = useNavigate();
  return (
    <_Stack>
      <Stack gap={16}>
        <Text fz="24" fw={700}>
          進行中
        </Text>
        {ongoingData.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            deadline={item.deadline}
            amount={item.amount}
            description={item.description}
            progress={item.progress}
            max_commit={item.max_commit}
            commit={item.commit}
            onClick={() => navigate(`/commit/${item.id}`)}
          />
        ))}
      </Stack>

      <Stack gap={16}>
        <Text fz="24" fw={700}>
          過去のコミット
        </Text>
        {completedData.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            deadline={item.deadline}
            amount={item.amount}
            description={item.description}
            progress={item.progress}
            max_commit={item.max_commit}
            commit={item.commit}
            onClick={() => navigate(`/commit/${item.id}`)}
          />
        ))}
      </Stack>
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
