import { create } from "zustand";

const useRecordStore = create((set) => ({
  isRecording: false,
  startRecording: () => set({ isRecording: true }),
  stopRecording: () => set({ isRecording: false }),
}));

export default useRecordStore;
