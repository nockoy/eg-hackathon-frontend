import { Button, Group, Stack, Text } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { Card } from "../components/Card";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";

const isDevelopment = import.meta.env.VITE_ENV === "development";

type Data = {
  challenge_id: number;
  commits: Date[];
  created_at: Date;
  deposit: number;
  description: string;
  end_date: Date;
  refund: number;
  status: string;
  title: string;
};

const fetchMockData = (): Data[] => {
  return [
    {
      challenge_id: 1,
      commits: [new Date("2025-02-24T00:00:00.000Z")],
      created_at: new Date("2025-02-24T00:00:00.000Z"),
      deposit: 2000,
      description: "ジムに5回行く！",
      end_date: new Date("2025-03-01T13:00:00.000Z"),
      refund: 0,
      status: "ongoing",
      title: "ジムに5回行く！",
    },
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
    },
    {
      challenge_id: 3,
      commits: [new Date("2025-02-24T00:00:00.000Z")],
      created_at: new Date("2025-02-24T00:00:00.000Z"),
      deposit: 1500,
      description: "毎日50個の英単語を覚えて、語彙力を強化する。",
      end_date: new Date("2025-02-24T10:00:00.000Z"),
      refund: 0,
      status: "completed",
      title: "毎日英単語を50個覚える",
    },
  ];
};

const fetchData = async (): Promise<Data[]> => {
  try {
    const res = await api.get("/users/1/home");
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const Index: FC = () => {
  const mockData = fetchMockData();
  const ongoingData = mockData.filter((item) => item.status === "ongoing");
  const completedData = mockData.filter((item) => item.status === "completed");
  const navigate = useNavigate();
  const [data, setData] = useState<Data[]>([]);

  // fetchDataを非同期で呼び出し、結果を待つ
  const fetchDataAndLog = async () => {
    if (isDevelopment) {
      const data = await fetchData();
      setData(data);
      console.log("data", data);
    } else {
      setData(mockData);
    }
  };

  // コンポーネントがマウントされたときにデータを取得

  useEffect(() => {
    fetchDataAndLog();
  }, []);

  // if (data.length === 0) {
  //   return null;
  // }

  return (
    <_Stack>
      <Group justify="space-between">
        <Button
          w="47%"
          color="yellow"
          variant="outline"
          radius="xl"
          size="md"
          pr={14}
          h={48}
          styles={{ section: { marginLeft: 22 } }}
          onClick={() => navigate("/new-commit")}
        >
          AIに相談
        </Button>
        <Button
          w="47%"
          color="yellow"
          variant="outline"
          radius="xl"
          size="md"
          pr={14}
          h={48}
          styles={{ section: { marginLeft: 22 } }}
          onClick={() => navigate("/new-commit")}
        >
          コミットを作成
        </Button>
      </Group>
      {isDevelopment && (
        <Stack gap={16}>
          <Text fz="24" fw={700}>
            DBから取得したデータ
          </Text>
          {data.map((item) => (
            <Card
              key={item.challenge_id}
              challenge_id={item.challenge_id}
              title={item.title}
              start_at={item.created_at.toString()}
              end_at={item.end_date.toString()}
              deposit={item.deposit}
              refund={item.refund}
              status={item.status}
              description={item.description}
              progress={item.commits.length / 5}
              max_commit={5}
              commit={data[0].commits.length}
              onClick={() => navigate(`/commit/${item.challenge_id}`)}
            />
          ))}
        </Stack>
      )}
      <Stack gap={16}>
        <Text fz="24" fw={700}>
          進行中
        </Text>
        {ongoingData.map((item) => (
          <Card
            key={item.challenge_id}
            challenge_id={item.challenge_id}
            title={item.title}
            start_at={item.created_at.toString()}
            end_at={item.end_date.toString()}
            deposit={item.deposit}
            refund={item.refund}
            status={item.status}
            description={item.description}
            progress={item.commits.length / 5}
            max_commit={5}
            commit={item.commits.length}
            onClick={() => navigate(`/commit/${item.challenge_id}`)}
          />
        ))}
      </Stack>

      <Stack gap={16}>
        <Text fz="24" fw={700}>
          過去のコミット
        </Text>
        {completedData.map((item) => (
          <Card
            key={item.challenge_id}
            challenge_id={item.challenge_id}
            title={item.title}
            start_at={item.created_at.toString()}
            end_at={item.end_date.toString()}
            deposit={item.deposit}
            refund={item.refund}
            status={item.status}
            description={item.description}
            progress={item.commits.length / 5}
            max_commit={5}
            commit={item.commits.length}
            onClick={() => navigate(`/commit/${item.challenge_id}`)}
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
