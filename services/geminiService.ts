
export const getEncouragement = (isCorrect: boolean): string => {
  const correctMsgs = ["GIỎI QUÁ!", "ĐÚNG RỒI!", "TUYỆT VỜI!", "HAY LẮM!", "XUẤT SẮC!"];
  const incorrectMsgs = ["CỐ LÊN NÀO!", "THỬ LẠI NHÉ!", "SẮP ĐÚNG RỒI!", "BẠN LÀM ĐƯỢC!", "CỐ GẮNG NÀO!"];
  
  const list = isCorrect ? correctMsgs : incorrectMsgs;
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
};

export const getEducationalNote = (topic: string): string => {
  if (topic === 'math') return "Toán học giúp chúng mình thông minh hơn!";
  if (topic === 'clock') return "Đồng hồ giúp chúng mình biết giờ chơi!";
  return "Học tập thật là vui!";
};
