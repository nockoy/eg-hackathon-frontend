import { Group, Progress, Stack, Text, Tooltip } from "@mantine/core";
import { FC } from "react";
import styled from "styled-components";

const fetchMockData = () => {
  return [
    {
      status: "ongoing",
      progress: 10,
      title: "ジムに5回行く！",
      deadline: "3月1日(土) 13:00",
      amount: 2000,
      description: "ジムに5回行く！",
    },
    {
      status: "ongoing",
      progress: 60,
      title: "本番までに過去問10年分解く",
      deadline: "3月1日(土) 13:00",
      amount: 2000,
      description:
        "2010年度〜2019年度の過去問を解く！\n得点率8割越えを目指したい。",
    },
    {
      status: "completed",
      progress: 80,
      title: "毎日英単語を50個覚える",
      deadline: "3月15日(日) 18:00",
      amount: 1500,
      description: "毎日50個の英単語を覚えて、語彙力を強化する。",
    },
  ];
};

export const Index: FC = () => {
  const mockData = fetchMockData();
  const ongoingData = mockData.filter((item) => item.status === "ongoing");
  const completedData = mockData.filter((item) => item.status === "completed");

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
          />
        ))}
      </Stack>
    </_Stack>
  );
};

type CardProps = {
  title: string;
  deadline: string;
  amount: number;
  description: string;
  progress: number;
};

const Card = ({
  title,
  deadline,
  amount,
  description,
  progress,
}: CardProps) => {
  return (
    <_Card>
      <Stack w="100%" gap={16}>
        <Group justify="space-between" w="100%" gap={16}>
          <Stack gap={4}>
            <_Text>{title}</_Text>
            <_Date>～ {deadline}</_Date>
          </Stack>
          <Text fz="32" fw={700} c="yellow">
            ￥{amount}
          </Text>
        </Group>
        <ProgressBar progress={progress} />

        <Stack justify="left" w="100%" gap={16}>
          <Text>{description}</Text>
        </Stack>
      </Stack>
    </_Card>
  );
};

type ProgressBarProps = {
  progress: number;
};

const ProgressBar = ({ progress }: ProgressBarProps) => {
  const displayProgress = progress < 4 ? 4 : progress;

  return (
    <Progress.Root w="100%" size={20} radius={16}>
      <Tooltip label="Progress">
        <Progress.Section
          value={displayProgress}
          color="orange"
          style={{ borderRadius: 16 }}
        >
          <Progress.Label></Progress.Label>
        </Progress.Section>
      </Tooltip>
    </Progress.Root>
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

const _Card = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
  border: 1px solid #e0e0e0;
  padding: 16px;
  box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.05);
`;

const _Text = styled.div`
  font-size: 16px;
  font-weight: bold;
  line-height: 1.6;
`;

const _Date = styled.div`
  font-size: 14px;
  line-height: 1.6;
`;
