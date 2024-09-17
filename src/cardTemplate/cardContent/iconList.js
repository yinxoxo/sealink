import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaThreads,
  FaGithub,
  FaYoutube,
  FaSnapchat,
  FaImagePortrait,
  FaDev,
  FaLinkedin,
} from "react-icons/fa6";

// 這個列表包含網站所有可用的圖標
const ICON_LIST = [
  { id: "x", name: "X", icon: FaTwitter },
  { id: "instagram", name: "Instagram", icon: FaInstagram },
  { id: "threads", name: "Threads", icon: FaThreads },
  { id: "facebook", name: "Facebook", icon: FaFacebook },
  { id: "email", name: "Email", icon: FaEnvelope },
  { id: "youtube", name: "Youtube", icon: FaYoutube },
  { id: "snapchat", name: "Snapchat", icon: FaSnapchat },
  { id: "portrait", name: "Portrait", icon: FaImagePortrait },
  { id: "dev", name: "Dev", icon: FaDev },
  { id: "linkedin", name: "Linkedin", icon: FaLinkedin },
];

// 為 SimpleCard 保存 icon 樣式設定
const ICON_STYLE = {
  SimpleCard: {
    color: "#ffffff",
    size: 30,
  },
  // 可以為其他卡片模板繼續添加樣式設置
};

// 將 ICON_LIST 和 ICON_STYLE 一起導出
export { ICON_LIST, ICON_STYLE };
