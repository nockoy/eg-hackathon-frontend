import { Button, Stack, Text, Textarea } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { formatDate } from "../../../util/formatDate";
import api from "../../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "@mantine/form";

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

const fetchData = async (challengeId: number) => {
  const res = await api.get(`/challenges/detail?challenge_id=${challengeId}`);
  return res.data;
};

const postReport = async (challengeId: number, comment: string = "test") => {
  try {
    const res = await api.post(`/reports`, {
      challenge_id: challengeId,
      comment: comment,
    });
    return { success: true, data: res.data };
  } catch (error) {
    console.error("レポート送信中にエラーが発生しました:", error);
    return { success: false, error };
  }
};

export const Index: FC = () => {
  const { id } = useParams();
  const challengeId = Number(id);
  const [data, setData] = useState<ChallengeData | null>(null);
  const [isOngoing, setIsOngoing] = useState(false);
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      description: "",
    },
    validate: {
      description: (value) =>
        value.length < 10 ? "10文字以上入力してください" : null,
    },
  });
  const fetchDataAndLog = async () => {
    try {
      const fetchedData = await fetchData(challengeId);
      setData(fetchedData);
      console.log("fetchedData", fetchedData);
      setIsOngoing(
        !fetchedData.commits ||
          (fetchedData.commits.length < fetchedData.max_commit &&
            new Date(fetchedData.end_date) >= new Date())
      );
    } catch (error) {
      console.error("データの取得中にエラーが発生しました:", error);
      alert("サーバーに接続できません。ネットワーク設定を確認してください。");
      setData(null);
    }
  };

  const handleClick = async () => {
    form.validate();
    if (!form.isValid()) return;
    try {
      if (data) {
        const result = await postReport(challengeId, form.values.description);
        if (result.success) {
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
            {formatDate(data.created_at?.toString() || "")} ~
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
            placeholder="達成したことを書きましょう（10文字以上）"
            autosize
            minRows={3}
            value={form.values.description}
            onChange={(event) =>
              form.setFieldValue("description", event.currentTarget.value)
            }
            error={form.errors.description && "10文字以上入力してください"}
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
