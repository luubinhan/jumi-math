
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getEncouragement = async (isCorrect: boolean, score: number): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Bạn là một người bạn ngôi sao hoạt hình cực kỳ thân thiện trong ứng dụng toán học cho trẻ em. 
      Em bé vừa trả lời ${isCorrect ? 'đúng' : 'sai'} một câu hỏi. 
      Điểm hiện tại của bé là ${score}/10. 
      Hãy đưa ra một câu cổ vũ cực kỳ ngắn gọn, vui tươi bằng TIẾNG VIỆT (tối đa 10 từ). 
      Sử dụng ngôn ngữ phù hợp với trẻ 6 tuổi (ví dụ: "Giỏi quá", "Cố lên nào", "Bạn làm được mà"). 
      Thêm các biểu tượng cảm xúc đáng yêu.`,
      config: {
        temperature: 0.9,
      }
    });
    return response.text || (isCorrect ? "Giỏi quá đi! 🌟" : "Đừng buồn, thử lại nhé! 🌈");
  } catch (error) {
    console.error("Gemini Error:", error);
    return isCorrect ? "Tuyệt vời ông mặt trời! ⭐" : "Bạn nhỏ làm được mà! 🎈";
  }
};

export const getEducationalNote = async (topic: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Giải thích về ${topic} cho trẻ 7 tuổi bằng TIẾNG VIỆT trong 2 câu đơn giản, thú vị. Hãy dùng hình ảnh so sánh.`,
      config: {
        temperature: 0.7,
      }
    });
    return response.text || "Học tập là một siêu năng lực đấy! Tiếp tục nào.";
  } catch (error) {
    return "Bạn đang thông minh hơn mỗi giây đấy!";
  }
};
