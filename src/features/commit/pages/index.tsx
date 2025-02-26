import { Stack, Text } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { formatDate } from "../../../util/formatDate";
import api from "../../../api/axios";
import { useParams } from "react-router-dom";

// const fetchMockData = () => {
//   return [
//     {
//       challenge_id: 2,
//       commits: [
//         new Date("2025-02-24T00:00:00.000Z"),
//         new Date("2025-02-25T00:00:00.000Z"),
//       ],
//       created_at: new Date("2025-02-24T00:00:00.000Z"),
//       deposit: 2000,
//       description:
//         "2010年度〜2019年度の過去問を解く！\n得点率8割越えを目指したい。",
//       end_date: new Date("2025-03-03T12:35:00.000Z"),
//       refund: 0,
//       status: "ongoing",
//       title: "本番までに過去問10年分解く",
//       max_commit: 5,
//     },
//   ];
// };

type ChallengeData = {
  challenge_id: number;
  user_id: number;
  group_id: number;
  title: string;
  image_url: string;
  description: string;
  max_commit: number;
  commit: number;
  commit_rate: number;
  status: string;
  end_date: string;
  public: boolean;
  official: boolean;
  updated_at: string;
  created_at: string;
  commits: Date[];
  deposit: number;
};

const fetchData = async (challengeId: number) => {
  const res = await api.get(`/challenges?challenge_id=${challengeId}`);
  return res.data;
};

export const Index: FC = () => {
  const { id } = useParams();
  console.log("id", id);
  const challengeId = Number(id);
  const [data, setData] = useState<ChallengeData | null>(null);

  const fetchDataAndLog = async () => {
    try {
      const fetchedData = await fetchData(challengeId);
      setData(fetchedData);
      console.log(fetchedData);
    } catch (error) {
      console.error("データの取得中にエラーが発生しました:", error);
      setData(null);
    }
  };
  console.log("data", data);

  useEffect(() => {
    fetchDataAndLog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challengeId]);

  if (!data) {
    return (
      <_Stack>
        <Text>データがありません</Text>
      </_Stack>
    );
  }

  return (
    <_Stack>
      <>
        <Stack gap={16}>
          <Stack gap={8}>
            <Text size="xl" fw={700}>
              {data.title}
            </Text>
            <Text size="md" fw={400}>
              開始：{formatDate(data.created_at?.toString() || "")}
            </Text>
            <Text size="md" fw={400}>
              期限：{formatDate(data.end_date?.toString() || "")}
            </Text>
            <Text size="md" fw={400}>
              回数：{data.max_commit}回
            </Text>
            <Text size="md" fw={400}>
              預かり金額：{data.deposit?.toLocaleString()}円
            </Text>
            <Text size="md" fw={400}>
              やること：{data.description}
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
