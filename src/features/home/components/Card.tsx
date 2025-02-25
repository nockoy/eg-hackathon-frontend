import { Group, Stack, Text } from "@mantine/core";
import styled from "styled-components";
import { ProgressBar } from "./ProgressBar";

type CardProps = {
  title: string;
  deadline: string;
  amount: string;
  description: string;
  progress: number;
  max_commit: number;
  commit: number;
  onClick: () => void;
};

export const Card = ({
  title,
  deadline,
  amount,
  description,
  progress,
  max_commit,
  commit,
  onClick,
}: CardProps) => {
  return (
    <_Card onClick={onClick}>
      <Stack w="100%" gap={16}>
        <Group justify="space-between" w="100%" gap={16}>
          <Stack gap={4}>
            <_Text>{title}</_Text>
            <_Date>～ {deadline}</_Date>
          </Stack>
          <Text fz="32" fw={700} c="yellow">
            ¥ {amount}
          </Text>
        </Group>
        <Stack gap={4}>
          <Text>
            あと<_OrangeSpan> {max_commit - commit} </_OrangeSpan> 回 / {max_commit} 回
          </Text>
          <ProgressBar progress={progress} color="yellow" />
        </Stack>
        <Stack gap={4}>
          <Text>
            残り<_RedSpan> 10 </_RedSpan>時間！
          </Text>
          <ProgressBar progress={0.4} color="red" />
        </Stack>

        <Stack justify="left" w="100%" gap={16}>
          <Text>{description}</Text>
        </Stack>
      </Stack>
    </_Card>
  );
};

const _Card = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
  border: 1px solid #e0e0e0;
  padding: 16px;
  box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.05);
  cursor: pointer;
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

const _OrangeSpan = styled.span`
  color: #ffa500;
  font-weight: bold;
  font-size: 24px;
`;

// const _GreenSpan = styled.span`
//   color: #40C057;
//   font-weight: bold;
//   font-size: 24px;
// `;

const _RedSpan = styled.span`
  color: #fa5252;
  font-weight: bold;
  font-size: 24px;
`;