import { Button, Stack, Text, Textarea } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { formatDate } from "../../../util/formatDate";
import { fetchChallengeDetail, postChallengeReport } from "../api/index";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "@mantine/form";
import { ChallengeDetailSkeleton } from "../components/ChallengeDetailSkeleton";

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
  // status: string;
  end_date: string;
  public: boolean;
  official: boolean;
  updated_at: string;
  created_at: string;
  commits: {
    created_at: Date;
    comment: string;
  }[];
  deposit: number;
  refund: number;
};

// キャッシュのキープレフィックス
const CACHE_KEY_PREFIX = "challengeDetail_";
// キャッシュの有効期限（ミリ秒）- 例: 5分
const CACHE_EXPIRY = 5 * 60 * 1000;

export const Index: FC = () => {
  const { id } = useParams();
  const challengeId = Number(id);
  const [data, setData] = useState<ChallengeData | null>(null);
  const [isOngoing, setIsOngoing] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      description: "",
    },
    validate: {
      description: (value) =>
        value.length < 5 ? "5文字以上入力してください" : null,
    },
  });

  // キャッシュからデータを取得する関数
  const getDataFromCache = (): {
    data: ChallengeData | null;
    timestamp: number | null;
  } => {
    const cacheKey = `${CACHE_KEY_PREFIX}${challengeId}`;
    const cachedData = sessionStorage.getItem(cacheKey);
    if (cachedData) {
      try {
        const { data, timestamp } = JSON.parse(cachedData);
        return { data, timestamp };
      } catch (error) {
        console.error("キャッシュデータの解析に失敗しました:", error);
        return { data: null, timestamp: null };
      }
    }
    return { data: null, timestamp: null };
  };

  // キャッシュにデータを保存する関数
  const saveDataToCache = (data: ChallengeData) => {
    const cacheKey = `${CACHE_KEY_PREFIX}${challengeId}`;
    const cacheData = {
      data,
      timestamp: Date.now(),
    };
    sessionStorage.setItem(cacheKey, JSON.stringify(cacheData));
  };

  const fetchDataAndLog = async () => {
    // キャッシュからデータを取得
    const { data: cachedData, timestamp } = getDataFromCache();
    const isCacheValid = timestamp && Date.now() - timestamp < CACHE_EXPIRY;

    // キャッシュが有効な場合はまずキャッシュデータを表示
    if (cachedData && isCacheValid) {
      setData(cachedData);
      setIsOngoing(
        !cachedData.commits ||
          (cachedData.commits.length < cachedData.max_commit &&
            new Date(cachedData.end_date) >= new Date())
      );
      setLoading(false);

      // バックグラウンドで最新データを取得（ローディング表示なし）
      try {
        const fetchedData = await fetchChallengeDetail(challengeId);
        console.log("バックグラウンド更新完了");

        // 新しいデータをキャッシュに保存
        saveDataToCache(fetchedData);

        // データを更新
        setData(fetchedData);
        setIsOngoing(
          !fetchedData.commits ||
            (fetchedData.commits.length < fetchedData.max_commit &&
              new Date(fetchedData.end_date) >= new Date())
        );
      } catch (error) {
        console.error("バックグラウンド取得中にエラーが発生しました:", error);
      }
      return;
    }

    // キャッシュがない場合は通常のローディング表示
    setLoading(true);
    try {
      const fetchedData = await fetchChallengeDetail(challengeId);
      console.log("fetchedData", fetchedData);

      // 新しいデータをキャッシュに保存
      saveDataToCache(fetchedData);

      setData(fetchedData);
      setIsOngoing(
        !fetchedData.commits ||
          (fetchedData.commits.length < fetchedData.max_commit &&
            new Date(fetchedData.end_date) >= new Date())
      );
    } catch (error) {
      console.error("データの取得中にエラーが発生しました:", error);

      // エラー時にキャッシュがあれば使用
      if (cachedData) {
        console.log("エラーのためキャッシュデータを使用します");
        setData(cachedData);
        setIsOngoing(
          !cachedData.commits ||
            (cachedData.commits.length < cachedData.max_commit &&
              new Date(cachedData.end_date) >= new Date())
        );
      } else {
        alert("サーバーに接続できません。ネットワーク設定を確認してください。");
        setData(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async () => {
    form.validate();
    if (!form.isValid()) return;
    try {
      if (data) {
        const result = await postChallengeReport(
          challengeId,
          form.values.description
        );
        if (result.success) {
          // レポート送信成功後、キャッシュを削除して最新データを取得
          sessionStorage.removeItem(`${CACHE_KEY_PREFIX}${challengeId}`);
          navigate("/");
        } else {
          console.error("レポート送信に失敗しました");
        }
      }
    } catch (error) {
      console.error("予期せぬエラーが発生しました:", error);
    }
  };

  useEffect(() => {
    fetchDataAndLog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challengeId]);

  if (loading) {
    return <ChallengeDetailSkeleton />;
  }

  if (!data) {
    return (
      <_Stack>
        <Text>データがありません</Text>
      </_Stack>
    );
  }

  return (
    <_Stack>
      <Stack gap={16}>
        <Stack
          gap={12}
          p={16}
          style={{ backgroundColor: "#f8f9fa", borderRadius: "12px" }}
        >
          <Text
            size="xl"
            fw={700}
            c="dark.8"
            style={{ borderBottom: "2px solid #FFC107", paddingBottom: "8px" }}
          >
            {data.title}
          </Text>
          <Text
            size="md"
            fw={500}
            c="gray.7"
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
          >
            <span style={{ color: "#555" }}>期間：</span>
            {formatDate(data.created_at?.toString() || "")}&nbsp;~&nbsp;
            {formatDate(data.end_date?.toString() || "")}
          </Text>
          <Text
            size="md"
            fw={500}
            c="gray.7"
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
          >
            <span style={{ color: "#555" }}>ステータス：</span>
            <span
              style={{
                backgroundColor: isOngoing ? "#E6F4EA" : "#FEEFC3",
                color: isOngoing ? "#137333" : "#B06000",
                padding: "2px 10px",
                borderRadius: "12px",
                fontSize: "0.9em",
              }}
            >
              {isOngoing ? "進行中" : "終了"}
            </span>
          </Text>
          <Text
            size="md"
            fw={500}
            c="gray.7"
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
          >
            <span style={{ color: "#555" }}>預かり金額：</span>
            <span style={{ color: "#FF6B6B", fontWeight: 600 }}>
              {data.deposit?.toLocaleString()}円
            </span>
          </Text>
          <Text
            size="md"
            fw={500}
            c="gray.7"
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
          >
            <span style={{ color: "#555" }}>返却金額：</span>
            {isOngoing ? (
              <span style={{ fontWeight: 600 }}>-</span>
            ) : (
              <span style={{ color: "#FF6B6B", fontWeight: 600 }}>
                {data.refund?.toLocaleString()}円
              </span>
            )}
          </Text>
          <Text
            size="md"
            fw={500}
            c="gray.7"
            style={{
              whiteSpace: "pre-wrap",
              backgroundColor: "white",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #eee",
              marginTop: "4px",
            }}
          >
            <span
              style={{ color: "#555", display: "block", marginBottom: "4px" }}
            >
              やること：
            </span>
            {data.description}
          </Text>
        </Stack>
      </Stack>
      {isOngoing && (
        <Stack gap={16}>
          <Textarea
            required
            label="達成報告"
            size="md"
            placeholder="達成したことを書きましょう"
            autosize
            minRows={3}
            value={form.values.description}
            onChange={(event) =>
              form.setFieldValue("description", event.currentTarget.value)
            }
            error={form.errors.description && "5文字以上入力してください"}
          />
          <Button
            color="yellow"
            radius="xl"
            size="md"
            pr={14}
            h={48}
            styles={{ section: { marginLeft: 22 } }}
            onClick={handleClick}
          >
            {data.commits && `${data.commits?.length + 1}回目の`}達成報告
          </Button>
          {/* TODO: 締め切りを超えたら出せないようにしたい */}
        </Stack>
      )}
      {data.commits && (
        <Stack
          gap={16}
          mt={8}
          p={20}
          style={{
            backgroundColor: "#f8f9fa",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <Text size="lg" fw={700} c="dark.8">
            コミット履歴：{" "}
            <span style={{ color: "#FFC107" }}>{data.commits.length}</span> /{" "}
            {data.max_commit}回
          </Text>
          {data.commits.map((commitDate, index) => (
            <Stack
              key={index}
              gap={8}
              p={16}
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                border: "1px solid #eee",
              }}
            >
              <Text
                size="md"
                fw={600}
                c="dark.7"
                pl={10}
                style={{
                  borderLeft: "4px solid #FFC107",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>{index + 1} 回目</span>
                <span style={{ fontSize: "0.9em", color: "#888" }}>
                  {formatDate(commitDate.created_at.toString())}
                </span>
              </Text>
              <Text size="sm" fw={400} c="gray.7" lh={1.6}>
                {commitDate.comment}
              </Text>
            </Stack>
          ))}
        </Stack>
      )}
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
