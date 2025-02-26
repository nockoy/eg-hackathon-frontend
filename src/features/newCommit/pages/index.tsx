import { Button, Stack, Textarea, TextInput, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Index: FC = () => {
  const [page, setPage] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      title: "",
      deadline: "",
      count: "",
      amount: "",
      description: "",
    },
    validate: {
      title: (val) => (val.length > 0 ? null : "タイトルを入力してください"),
      deadline: (val) => (val.length > 0 ? null : "期限を入力してください"),
      count: (val) => (val.length > 0 ? null : "回数を入力してください"),
      amount: (val) => (val.length > 0 ? null : "金額を入力してください"),
    },
  });

  return (
    <_Stack>
      {page === 0 && (
        <>
          <form>
            <Stack gap={16}>
              <TextInput
                required
                type="text"
                size="md"
                placeholder="例）1週間後までに2回ジムに行く！"
                label="タイトル"
                radius="8px"
                value={form.values.title}
                onChange={(event) =>
                  form.setFieldValue("title", event.currentTarget.value)
                }
                error={form.errors.title && "タイトルを入力してください"}
              />
              <DatePicker
                dateFormat="yyyy/MM/dd HH:mm"
                locale="ja"
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date!)}
                showTimeSelect
                timeIntervals={30}
              />
              <TextInput
                required
                type="text"
                size="md"
                placeholder="例）3月1日(土) 13:00"
                label="期限"
                radius="8px"
                value={form.values.deadline}
                onChange={(event) =>
                  form.setFieldValue("deadline", event.currentTarget.value)
                }
                error={form.errors.deadline && "期限を入力してください"}
              />
              <TextInput
                required
                type="number"
                size="md"
                placeholder="例）2"
                label="回数"
                radius="8px"
                value={form.values.count}
                onChange={(event) =>
                  form.setFieldValue("count", event.currentTarget.value)
                }
                error={form.errors.count && "回数を入力してください"}
              />
              <TextInput
                required
                type="number"
                size="md"
                placeholder="例）2000"
                label="金額（円）"
                radius="8px"
                value={form.values.amount}
                onChange={(event) =>
                  form.setFieldValue("amount", event.currentTarget.value)
                }
                error={form.errors.amount && "金額を入力してください"}
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
      {page === 1 && (
        <>
          <Stack gap={16}>
            <Stack gap={8}>
              <Text size="xl" fw={700}>
                {form.values.title}
              </Text>
              <Text size="md" fw={400}>
                {form.values.deadline} までに
              </Text>
              <Text size="md" fw={400}>
                {form.values.count}回
              </Text>
              <Text size="md" fw={400}>
                {form.values.amount}円
              </Text>
              <Text size="md" fw={400}>
                {form.values.description}
              </Text>
              <Text size="xl" fw={700}>
                決済方法
              </Text>
            </Stack>
          </Stack>
          <Button
            variant="light"
            radius="xl"
            size="md"
            pr={14}
            h={48}
            styles={{ section: { marginLeft: 22 } }}
            onClick={() => navigate("/")}
          >
            作成
          </Button>
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
