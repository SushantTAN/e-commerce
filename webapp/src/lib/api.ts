import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const fetchProducts = async ({ pageParam = 1, queryKey }: any) => {
  const [_, filters] = queryKey;
  const { data } = await api.get('/products', {
    params: { ...filters, page: pageParam },
  });
  return data;
};
