import api from "../../../api/axios";

// チャレンジの詳細データを取得する関数
export const fetchChallengeDetail = async (challengeId: number) => {
  const res = await api.get(`/challenges/detail?challenge_id=${challengeId}`);
  return res.data;
};

// レポートを送信する関数
export const postChallengeReport = async (challengeId: number, comment: string = "test") => {
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