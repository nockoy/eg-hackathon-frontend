import { Button, Group, Stack, Text } from "@mantine/core";
import { FC, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Card } from "../components/Card/Card";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";
import { UserContext } from "../../../contexts/UserContext";
import { SkeletonCard } from "../components/Card/SkeletonCard";

type Data = {
  challenge_id: number;
  commits: Date[];
  created_at: Date;
  deposit: number;
  description: string;
  end_date: Date;
  refund: number;
  // status: string;
  title: string;
  max_commit: number;
};

const fetchData = async (userId: string): Promise<Data[]> => {
  try {
    const res = await api.get(`/users/${userId}/home`);
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// キャッシュのキー
const CACHE_KEY = "homeDataCache";
// キャッシュの有効期限（ミリ秒）- 例: 5分
const CACHE_EXPIRY = 5 * 60 * 1000;

export const Index: FC = () => {
  const navigate = useNavigate();
  const [ongoingData, setOngoingData] = useState<Data[]>([]);
  const [completedData, setCompletedData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useContext(UserContext);

  // キャッシュからデータを取得する関数
  const getDataFromCache = (): {
    data: Data[] | null;
    timestamp: number | null;
  } => {
    const cachedData = sessionStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      return { data, timestamp };
    }
    return { data: null, timestamp: null };
  };

  // キャッシュにデータを保存する関数
  const saveDataToCache = (data: Data[]) => {
    const cacheData = {
      data,
      timestamp: Date.now(),
    };
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  };

  // fetchDataを非同期で呼び出し、結果を待つ
  const fetchDataAndLog = async () => {
    // キャッシュからデータを取得
    const { data: cachedData, timestamp } = getDataFromCache();
    const isCacheValid = timestamp && Date.now() - timestamp < CACHE_EXPIRY;

    // キャッシュが有効な場合はまずキャッシュデータを表示
    if (cachedData && isCacheValid) {
      processData(cachedData);
      setLoading(false);

      // バックグラウンドで常に最新データを取得（ローディング表示なし）
      try {
        const data = await fetchData(userId);
        console.log("Background update completed");

        // 新しいデータをキャッシュに保存
        saveDataToCache(data);

        // データを処理して状態を更新
        processData(data);
      } catch (error) {
        console.error("Error in background fetch:", error);
      }
      return;
    }

    // キャッシュがない場合は通常のローディング表示
    setLoading(true);
    try {
      const data = await fetchData(userId);
      console.log("data", data);

      // 新しいデータをキャッシュに保存
      saveDataToCache(data);

      // データを処理して状態を更新
      processData(data);
    } catch (error) {
      console.error("Error fetching data:", error);

      // エラー時にキャッシュがあれば使用
      if (cachedData) {
        console.log("Using cached data due to fetch error");
        processData(cachedData);
      }
    } finally {
      setLoading(false);
    }
  };

  // データを処理して状態を更新する関数
  const processData = (data: Data[]) => {
    const currentDate = new Date();

    // 完了したチャレンジ：コミット回数が上限に達したか、期限が過ぎたもの
    const completed = data.filter(
      (item) =>
        item.commits.length >= item.max_commit ||
        new Date(item.end_date) < currentDate
    );

    // 進行中のチャレンジ：完了していないもの
    const ongoing = data.filter(
      (item) =>
        item.commits.length < item.max_commit &&
        new Date(item.end_date) >= currentDate
    );

    setOngoingData(ongoing);
    setCompletedData(completed);
  };

  useEffect(() => {
    fetchDataAndLog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          onClick={() => navigate("/new-challenge?mode=ai")}
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
          onClick={() => navigate("/new-challenge")}
        >
          チャレンジ作成
        </Button>
      </Group>

      <Stack gap={16}>
        <Text fz="24" fw={700}>
          進行中
        </Text>
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : ongoingData.length > 0 ? (
          ongoingData.map((item) => (
            <Card
              key={item.challenge_id}
              status={"ongoing"}
              challenge_id={item.challenge_id}
              title={item.title}
              start_at={item.created_at.toString()}
              end_at={item.end_date.toString()}
              deposit={item.deposit}
              refund={item.refund}
              description={item.description}
              progress={item.commits.length / item.max_commit}
              max_commit={item.max_commit}
              commit={item.commits.length}
              commits={item.commits}
              onClick={() => navigate(`/challenge/${item.challenge_id}`)}
            />
          ))
        ) : (
          <Text>進行中のチャレンジはありません</Text>
        )}
      </Stack>

      <Stack gap={16}>
        <Text fz="24" fw={700}>
          過去のチャレンジ
        </Text>
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : completedData.length > 0 ? (
          completedData.map((item) => (
            <Card
              key={item.challenge_id}
              status={"completed"}
              challenge_id={item.challenge_id}
              title={item.title}
              start_at={item.created_at.toString()}
              end_at={item.end_date.toString()}
              deposit={item.deposit}
              refund={item.refund}
              description={item.description}
              progress={item.commits.length / item.max_commit}
              max_commit={item.max_commit}
              commit={item.commits.length}
              commits={item.commits}
              onClick={() => navigate(`/challenge/${item.challenge_id}`)}
            />
          ))
        ) : (
          <Text>過去のチャレンジはありません</Text>
        )}
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
  padding-bottom: 160px;
`;
