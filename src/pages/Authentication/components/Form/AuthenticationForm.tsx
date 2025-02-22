import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Group,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useToggle } from "@mantine/hooks";
import { GoogleButton } from "../Button/GoogleButton";
import styled from "styled-components";
import { ReactNode, useCallback, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import fireAuth from "../../../../firebase";

export const AuthenticationForm = (props: PaperProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length < 6 ? "6文字以上で入力してください" : null,
    },
  });

  const signInWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    try {
      const auth = getAuth();
      await signInWithPopup(auth, provider);
      navigate("/");
      return { success: true, message: "" };
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e);
      }
      return { success: false, message: "エラーが発生しました" };
    }
  }, [navigate]);

  const handleSignIn = useCallback(async () => {
    setLoading(true);
    if (type === "login") {
      try {
        await signInWithEmailAndPassword(
          fireAuth,
          form.values.email,
          form.values.password
        );
        // const response = await axios.get(baseURL + "/user2?email=" + values.email);
        // const response2 = await axios.get(baseURL + '/channel/join?user_id=' + response.data[0].id);

        navigate("/");
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    } else {
      try {
        // const response = await axios.post(baseURL + '/user', {
        //   name: values.name,
        //   email: values.email
        // });
        // const response2 = await axios.get(baseURL + '/channel/join?user_id=' + response.data.id);

        await createUserWithEmailAndPassword(
          fireAuth,
          form.values.email,
          form.values.password
        );

        // setUser(response.data.id, response.data.name, defaultIcon, channel_id);

        navigate("/");
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  }, [form, navigate, type]);

  return (
    <_Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" fw={500}>
        アプリのロゴを入れたい
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl" onClick={signInWithGoogle}>
          Googleでログイン
        </GoogleButton>
      </Group>

      <Divider label="または" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(handleSignIn)}>
        <Stack>
          {type === "register" && (
            <TextInput
              required
              label="ニックネーム"
              placeholder=""
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
              radius="md"
            />
          )}

          <TextInput
            required
            label="メールアドレス"
            placeholder=""
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
            radius="md"
          />

          <PasswordInput
            required
            label="パスワード"
            placeholder=""
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={form.errors.password && "6文字以上で入力してください"}
            radius="md"
          />

          {type === "register" && (
            // TODO: 利用規約を作成する
            <Checkbox
              label="利用規約に同意する"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "register"
              ? "アカウントをお持ちの方はログイン"
              : "アカウントを作成"}
          </Anchor>
          <Button type="submit" radius="xl" disabled={loading}>
            {type === "register" ? "登録" : "ログイン"}
          </Button>
        </Group>
      </form>
    </_Paper>
  );
};

interface PaperPropsWithChildren extends PaperProps {
  children: ReactNode;
}

const _Paper = styled(Paper)<PaperPropsWithChildren>`
  width: 100%;
  max-width: 340px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`;
