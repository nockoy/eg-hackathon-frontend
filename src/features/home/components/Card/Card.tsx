import { Stack, Text } from "@mantine/core";
import styled from "styled-components";
import { ProgressBar } from "../ProgressBar";
import { useEffect, useState } from "react";
import { formatDate } from "../../../../util/formatDate";

type CardProps = {
  status: "ongoing" | "completed";
  challenge_id: number;
  title: string;
  start_at: string;
  end_at: string;
  deposit: number;
  refund: number;
  description: string;
  progress: number;
  max_commit: number;
  commit: number;
  commits: Date[];
  onClick: () => void;
};

// 日時の差分を計算する関数
const calculateTimeDifference = (
  endDate: string | Date,
  lastCommitDate: string | Date
) => {
  const end = new Date(endDate);
  const lastCommit = new Date(lastCommitDate);
  const diffTime = end.getTime() - lastCommit.getTime();

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(
    (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

  return { diffDays, diffHours, diffMinutes };
};

export const Card = ({
  status,
  title,
  start_at,
  end_at,
  deposit,
  refund,
  description,
  progress,
  max_commit,
  commit,
  commits,
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
        <_Row>
          <Stack gap={4}>
            <_Text>{title}</_Text>
            <_Date>
              {formatDate(start_at)} ~ {formatDate(end_at)}
            </_Date>
          </Stack>
          <Stack gap={4} align="flex-end" w="fit-content">
            {status === "ongoing" && (
              <Text
                fz="32"
                fw={700}
                lh={1.2}
                c="yellow"
                style={{ whiteSpace: "nowrap" }}
              >
                ¥ {deposit.toLocaleString()}
              </Text>
            )}
            {status === "completed" && (
              <>
                <Text
                  fz="26"
                  fw={700}
                  lh={1.2}
                  c="gray.5"
                  style={{ whiteSpace: "nowrap" }}
                >
                  ¥ {deposit.toLocaleString()}
                </Text>
                {max_commit - commit > 0 ? (
                  <Text
                    fz="32"
                    fw={700}
                    lh={1.2}
                    c="red"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    - ¥ {(deposit - refund).toLocaleString()}
                  </Text>
                ) : (
                  <Text
                    fz="32"
                    fw={700}
                    lh={1.2}
                    c="green"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    達成！
                  </Text>
                )}
              </>
            )}
          </Stack>
        </_Row>
        <Stack gap={4}>
          {max_commit - commit > 0 ? (
            <Text>
              あと<_OrangeSpan> {max_commit - commit} </_OrangeSpan> 回 /{" "}
              {max_commit} 回
            </Text>
          ) : (
            <Text c="yellow" fw={700}>
              達成おめでとうございます！
            </Text>
          )}

          <ProgressBar progress={progress} color="yellow" />
        </Stack>
        <Stack gap={4}>
          <Text>
            {commit === max_commit ? (
              <>
                残り
                {(() => {
                  const { diffDays, diffHours, diffMinutes } =
                    calculateTimeDifference(
                      end_at,
                      commits[commits.length - 1]
                    );

                  return (
                    <>
                      {diffDays > 0 && (
                        <>
                          <_Span> {diffDays}</_Span>日&nbsp;
                        </>
                      )}
                      <_Span>{diffHours}</_Span>時間
                      <_Span>{diffMinutes}</_Span>分
                    </>
                  );
                })()}
                で達成しました
              </>
            ) : 0 <= timeRatio && timeRatio < 1 ? (
              // 達成できた場合はcommitsのラストの日付から計算したい
              <>
                残り
                {remainingDays > 0 && (
                  <>
                    <_Span> {remainingDays}</_Span>日&nbsp;
                  </>
                )}
                <_Span>{remainingHours}</_Span>時間
                <_Span>{remainingMinutes}</_Span>分
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

const _Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

const _Card = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
  border: 1px solid #e9e9e9;
  padding: 16px;
  box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.12);
  }
`;

const _Text = styled.div`
  font-size: 18px;
  font-weight: 700;
  line-height: 1.4;
  color: #333;
`;

const _Date = styled.div`
  font-size: 14px;
  line-height: 1.6;
  color: #666;
`;

const _OrangeSpan = styled.span`
  color: #ff9500;
  font-weight: bold;
  font-size: 26px;
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
  font-size: 22px;
  font-weight: 500;
  color: #444;
`;
