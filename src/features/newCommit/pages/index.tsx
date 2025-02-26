import { Button, Stack, Textarea, TextInput, Text, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CustomDatePicker } from "../components/DatePicker/DatePicker";
import api from "../../../api/axios";
import { UserContext } from "../../../contexts/UserContext";

export const Index: FC = () => {
  const [page, setPage] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date;
  });
  const navigate = useNavigate();
  const { userId } = useContext(UserContext);

  const form = useForm({
    initialValues: {
      title: "",
      end_at: selectedDate.toString(),
      max_commit: "",
      deposit: "",
      description: "",
    },
    validate: {
      title: (val) => (val.length > 0 ? null : "タイトルを入力してください"),
      end_at: (val) => (val.length > 0 ? null : "期限を入力してください"), // TODO: 最短でも10分後にしたい
      max_commit: (val) => (val.length > 0 ? null : "回数を入力してください"),
      deposit: (val) => (val.length > 0 ? null : "金額を入力してください"),
    },
  });

  const handleClickCreate = async () => {
    console.log("create");
    console.log(form.values);

    // 日付を「2025-03-05 13:12:00」形式に変換（秒は00に固定）
    const date = new Date(form.values.end_at);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = "00"; // 秒を00に固定

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    try {
      await api.post("/challenges", {
        user_id: parseInt(userId),
        title: form.values.title,
        description: form.values.description,
        max_commit: parseInt(form.values.max_commit),
        end_date: formattedDate, // フォーマットした日付を使用
        // deposit: form.values.deposit, // TODO: 追加
      });

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <_Stack>
      {page === 0 && (
        <>
          <form>
            <Stack gap={16}>
              <Textarea
                label="AIに相談"
                size="md"
                placeholder="例）1か月後までに5kg痩せたい！"
                autosize
                minRows={3}
                value={form.values.description}
                onChange={(event) =>
                  form.setFieldValue("description", event.currentTarget.value)
                }
              />
            </Stack>
          </form>
          <Button
            // variant="light"
            radius="xl"
            size="md"
            color="yellow"
            pr={14}
            h={48}
            styles={{ section: { marginLeft: 22 } }}
            onClick={() => {
              form.validate();
              if (form.isValid()) {
                setPage(1);
              }
            }}
          >
            相談する
          </Button>
        </>
      )}
      {page === 1 && (
        <>
          <form>
            <Stack gap={16}>
              <TextInput
                required
                type="text"
                size="md"
                placeholder="例）1か月後までに2kg痩せたい！"
                label="タイトル"
                radius="8px"
                value={form.values.title}
                onChange={(event) => {
                  form.setFieldValue("title", event.currentTarget.value);
                }}
                error={form.errors.title && "タイトルを入力してください"}
              />
              <Stack gap={0} w="100%">
                <Group gap={4}>
                  <Text>期限</Text>
                  <span
                    style={{
                      color:
                        "var(--input-asterisk-color, var(--mantine-color-error))",
                      fontSize: 16,
                    }}
                  >
                    *
                  </span>
                </Group>
                <CustomDatePicker
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  onChange={(event) => {
                    form.setFieldValue("end_at", event.toString());
                    console.log("event", event.toString());
                  }}
                />
              </Stack>
              <TextInput
                required
                type="number"
                size="md"
                placeholder="例）2"
                label="回数"
                radius="8px"
                value={form.values.max_commit}
                onChange={(event) =>
                  form.setFieldValue("max_commit", event.currentTarget.value)
                }
                error={form.errors.max_commit && "回数を入力してください"}
              />
              <TextInput
                required
                type="number"
                size="md"
                placeholder="例）2000"
                label="金額（円）"
                radius="8px"
                value={form.values.deposit}
                onChange={(event) =>
                  form.setFieldValue("deposit", event.currentTarget.value)
                }
                error={form.errors.deposit && "金額を入力してください"}
              />
              <Textarea
                label="やること"
                size="md"
                placeholder="目標をしっかりと書こう"
                autosize
                minRows={3}
                value={form.values.description}
                onChange={(event) =>
                  form.setFieldValue("description", event.currentTarget.value)
                }
              />
            </Stack>
          </form>
          <Button
            // variant="light"
            radius="xl"
            size="md"
            color="yellow"
            pr={14}
            h={48}
            styles={{ section: { marginLeft: 22 } }}
            onClick={() => {
              form.validate();
              if (form.isValid()) {
                setPage(1);
              }
            }}
          >
            次へ
          </Button>
        </>
      )}
      {page === 2 && (
        <>
          <Stack
            gap={24}
            p={20}
            style={{
              backgroundColor: "#f9f9f9",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <Text
              size="lg"
              fw={700}
              color="#444"
              style={{
                borderBottom: "2px solid #FFD43B",
                paddingBottom: "8px",
              }}
            >
              確認画面
            </Text>
            <Stack gap={12}>
              <Group>
                <Text size="sm" fw={500} color="dimmed">
                  タイトル
                </Text>
                <Text size="md" fw={700}>
                  {form.values.title}
                </Text>
              </Group>

              <Group>
                <Text size="sm" fw={500} color="dimmed">
                  期限
                </Text>
                <Text size="md" fw={500}>
                  {new Date(form.values.end_at)
                    .toLocaleString("ja-JP", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                    .replace(/\//g, "/")
                    .replace(",", "")}
                  &nbsp;まで
                </Text>
              </Group>

              <Group>
                <Text size="sm" fw={500} color="dimmed">
                  回数
                </Text>
                <Text size="md" fw={500}>
                  {form.values.max_commit}回
                </Text>
              </Group>

              <Group>
                <Text size="sm" fw={500} color="dimmed">
                  金額
                </Text>
                <Text size="md" fw={500}>
                  {form.values.deposit}円
                </Text>
              </Group>

              {form.values.description && (
                <>
                  <Text size="sm" fw={500} color="dimmed" mt={8}>
                    やること
                  </Text>
                  <Text
                    size="md"
                    fw={400}
                    p={12}
                    style={{
                      backgroundColor: "white",
                      borderRadius: "8px",
                      border: "1px solid #eee",
                    }}
                  >
                    {form.values.description}
                  </Text>
                </>
              )}
            </Stack>
          </Stack>

          <Group justify="space-between">
            <Button
              variant="outline"
              radius="xl"
              size="md"
              color="yellow"
              onClick={() => setPage(0)}
              style={{ flex: 1, maxWidth: "45%" }}
            >
              戻る
            </Button>
            <Button
              variant="filled"
              radius="xl"
              size="md"
              color="yellow"
              onClick={handleClickCreate}
              style={{ flex: 1, maxWidth: "45%" }}
            >
              作成する
            </Button>
          </Group>
        </>
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
  padding-bottom: calc(80px + env(safe-area-inset-bottom) * 0.2);
`;
