import api from "../../../api/axios";

export type HomeData = {
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

// キャッシュのキー
export const CACHE_KEY = "homeDataCache";
// キャッシュの有効期限（ミリ秒）- 例: 5分
export const CACHE_EXPIRY = 5 * 60 * 1000;

export const fetchHomeData = async (userId: string): Promise<HomeData[]> => {
  try {
    const res = await api.get(`/users/${userId}/home`);
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// キャッシュからデータを取得する関数
export const getDataFromCache = (): {
  data: HomeData[] | null;
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
export const saveDataToCache = (data: HomeData[]) => {
  const cacheData = {
    data,
    timestamp: Date.now(),
  };
  sessionStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
};