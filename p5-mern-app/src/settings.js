import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "b93235626be34723be44b11181ce1053";
const token =
  "007eJxTYFBhf+12UIB1suS7iSem9D2XO/52e8r1ttuP7lh+NpVeveelAkOSpbGRsamZkVlSqrGJuZFxUqqJSZKhoaGFYXKqoYGpsaFSTXJDICMDd3EdEyMDBIL4LAy5iZl5DAwAnPgfjQ==";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";
