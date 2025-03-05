import { ref } from 'vue';
import axios from 'axios';


let apiServer = '';
let { PROD ,VITE_API, VITE_API_URL } = import.meta.env;
console.log(`env:`, import.meta.env); // api2

if (!PROD && VITE_API) {
  // 開發切換
  apiServer = '/server/api2';
}else {
  apiServer = `${VITE_API_URL ?? ''}${VITE_API ?? ''}`;
}

export const useApiServer = () => {
  const data = ref([]);
  const errorMessage = ref("");

  const FetchInit = async (url) => {
     // 使用 apiServer 拼接 URL
     // apiUrl: /server/api2/users
    const apiUrl = `${apiServer}${url}`;
    console.log(`apiUrl:`, apiUrl);

    try {
      const res = await axios.get(apiUrl);
      data.value = res.data.data;
    } catch (error) {
      console.log('catch', error);
      errorMessage.value = "API 發生錯誤";
    }
  };

  return {
    data,
    errorMessage,
    FetchInit,
  };
};
