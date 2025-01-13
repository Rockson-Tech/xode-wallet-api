import axios from 'axios';
import { signMessage } from './authService';

const BASE_URL = process.env.PRODUCT_API;

export interface WalletResponse {
  wallet_address: string;
  email_address: string;
}

interface UpdateResponse {
  id: number;
  wallet_address: string;
  category: string;
  did_receive: boolean;
  game_id: number;
  created_at: string;
  updated_at: string;
  games: { game_name: string };
}

interface FeedbackResponse {
  id: number;
  wallets: { wallet_address: string };
  status: String;
}

export async function getAccountData(
  token: string,
  start?: number,
  end?: number
): Promise<WalletResponse[] | Error> {
  const result = signMessage('marketing');
  if (!result.is_valid) return Error('Invalid signature.');
  try {
    const params: { start?: number; end?: number } = {};
    if (start !== undefined) params.start = start;
    if (end !== undefined) params.end = end;
    const response = await axios.get<{ data: WalletResponse[] }>(
      `${BASE_URL}/wallets`,
      {
        params,
        headers: {
          // Authorization: `Bearer ${token}`,
          Token: result.token,
        },
      }
    );
    return response.data.data;
  } catch (error: any) {
    return Error(error.message);
  }
}

export async function updateAccountData(
  wallet: string,
  token: string
): Promise<UpdateResponse | Error> {
  const result = await signMessage('marketing');
  if (!result.is_valid) return Error('Invalid signature.');
  try {
    const response = await axios.put<{ data: UpdateResponse }>(
      `${BASE_URL}/wallets/${wallet}`,
      { did_receive: true },
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          Token: result.token,
        },
      }
    );
    return response.data.data;
  } catch (error: any) {
    return Error(error.message);
  }
}

export async function getFeedbackData(
  id: string,
  token: string
): Promise<FeedbackResponse | Error> {
  const result = await signMessage('marketing');
  if (!result.is_valid) return Error('Invalid signature.');
  try {
    const response = await axios.get<FeedbackResponse>(
      `${BASE_URL}/feedbacks/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // Token: result.token,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return Error(error.message);
  }
}

export async function emailtokenReceiver(
  wallet: string,
  token: string
): Promise<{} | Error> {
  const result = signMessage('marketing');
  if (!result.is_valid) return Error('Invalid signature.');
  try {
    const response = await axios.post<{ data: {} }>(
      `${BASE_URL}/emails/email-token-receiver`,
      { wallet },
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          Token: result.token,
        },
      }
    );
    return response.data.data;
  } catch (error: any) {
    return Error(error.message);
  }
}
