import { Group, Stack, Text } from "@mantine/core";
import styled from "styled-components";
import { ProgressBar } from "./ProgressBar";
import { useEffect, useState } from "react";

type CardProps = {
  challenge_id: number;
  title: string;
  start_at: string;
  end_at: string;
  deposit: number;
  refund: number;
  status: string;
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
  deposit,
  refund,
  status,
  description,
  progress,
  max_commit,
  commit,
  onClick,
}: CardProps) => {
  const [remainingDays, setRemainingDays] = useState(0);
  const [remainingHours, setRemainingHours] = useState(0);
  const [remainingMinutes, setRemainingMinutes] = useState(0);
  const [timeRatio, setTimeRatio] = useState(0);

  useEffect(() => {
    const updateRemainingTime = () => {
      const currentTime = new Date();
      const startDate = new Date(start_at);
      const endDate = new Date(end_at);
      const timeFromStartToNow = currentTime.getTime() - startDate.getTime();
      const timeFromNowToEnd = endDate.getTime() - currentTime.getTime();
      const timeFromStartToEnd = endDate.getTime() - startDate.getTime();
      const timeRatio = timeFromStartToNow / timeFromStartToEnd;

      setTimeRatio(timeRatio);
      setRemainingDays(Math.floor(timeFromNowToEnd / (1000 * 60 * 60 * 24)));
      setRemainingHours(
        Math.floor(
          (timeFromNowToEnd % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )
      );
      setRemainingMinutes(
        Math.floor((timeFromNowToEnd % (1000 * 60 * 60)) / (1000 * 60))
      );
    };

    updateRemainingTime();
    const intervalId = setInterval(updateRemainingTime, 1000); // 1秒ごとに更新

    return () => clearInterval(intervalId);
  }, [start_at, end_at]);

  return (
    <_Card onClick={onClick}>
      <Stack w="100%" gap={16}>
        <Group justify="space-between" w="100%" gap={16}>
          <Stack gap={4}>
            <_Text>{title}</_Text>
            <_Date>~ {formatDate(end_at)}</_Date>
          </Stack>
          <Stack gap={4} align="flex-end">
            <Text fz="32" fw={700} lh={1.2} c="yellow">
              ¥ {deposit}
            </Text>
            {status === "completed" && (
              <Text fz="32" fw={700} lh={1.2} c="red">
                - ¥ {deposit - refund}
              </Text>
            )}
          </Stack>
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
            {timeRatio < 1 ? (
              <>
                残り
                {remainingDays > 0 && (
                  <>
                    <_Span> {remainingDays} </_Span>日&nbsp;
                  </>
                )}
                <_Span> {remainingHours} </_Span>時間
                <_Span> {remainingMinutes} </_Span>分
              </>
            ) : (
              <>終了しました</>
            )}
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
