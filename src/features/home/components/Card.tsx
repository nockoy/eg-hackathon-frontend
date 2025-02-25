import { Group, Stack, Text } from "@mantine/core";
import styled from "styled-components";
import { ProgressBar } from "./ProgressBar";

type CardProps = {
  title: string;
  start_at: string;
  end_at: string;
  amount: string;
  description: string;
  progress: number;
  max_commit: number;
  commit: number;
  onClick: () => void;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: "numeric",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return new Intl.DateTimeFormat("ja-JP", options).format(date);
};

export const Card = ({
  title,
  start_at,
  end_at,
  amount,
  description,
  progress,
  max_commit,
  commit,
  onClick,
}: CardProps) => {
  const now = new Date();
  const startDate = new Date(start_at);
  const endDate = new Date(end_at);
  console.log("end_at", end_at);
  console.log("endDate", endDate);

  const timeFromNowToStart = now.getTime() - startDate.getTime();
  const timeFromStartToEnd = endDate.getTime() - startDate.getTime();
  const timeRatio = timeFromNowToStart / timeFromStartToEnd;
  console.log("timeRatio", timeRatio);

  const timeFromNowToEnd = endDate.getTime() - now.getTime();

  const remainingDays = Math.floor(timeFromNowToEnd / (1000 * 60 * 60 * 24));
  const remainingHours = Math.floor(
    (timeFromNowToEnd % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const remainingMinutes = Math.floor(
    (timeFromNowToEnd % (1000 * 60 * 60)) / (1000 * 60)
  );

  return (
    <_Card onClick={onClick}>
      <Stack w="100%" gap={16}>
        <Group justify="space-between" w="100%" gap={16}>
          <Stack gap={4}>
            <_Text>{title}</_Text>
            <_Date>~ {formatDate(end_at)}</_Date>
          </Stack>
          <Text fz="32" fw={700} c="yellow">
            ¥ {amount}
          </Text>
        </Group>
        <Stack gap={4}>
          <Text>
            あと<_OrangeSpan> {max_commit - commit} </_OrangeSpan> 回 /{" "}
            {max_commit} 回
          </Text>
          <ProgressBar progress={progress} color="yellow" />
        </Stack>
        <Stack gap={4}>
          <Text>
            残り<_Span> {remainingDays} </_Span>日&nbsp;
            <_Span> {remainingHours} </_Span>時間
            <_Span> {remainingMinutes} </_Span>分
          </Text>
          <ProgressBar
            progress={timeRatio}
            color="red"
            backgroundColor="gray.2"
          />
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

// const _RedSpan = styled.span`
//   color: #fa5252;
//   font-weight: bold;
//   font-size: 24px;
// `;

const _Span = styled.span`
  /* font-weight: bold; */
  font-size: 24px;
`;
