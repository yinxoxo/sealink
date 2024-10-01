const initialNinaWishCardContent = {
  texts: [
    {
      text: "Wish Upon a Star",
      style: {
        color: "#F7FFF7", // 使用 Mint cream 顏色
        fontWeight: 700,
        fontSize: "40px", // 調整標題大小
        fontFamily: "Chewy, sans-serif",
      },
    },
    {
      text: "Making your dreams come true",
      style: {
        color: "#FFE66D", // 使用 Naples yellow 顏色
        fontWeight: 700,
        fontSize: "18px", // 調整副標題大小
        fontFamily: "Share Tech Mono, sans-serif",
      },
    },
    {
      text: "By little angle - Nina",
      style: {
        color: "#FFE66D",
        fontWeight: 700,
        fontSize: "18px",
        fontFamily: "Share Tech Mono, sans-serif",
      },
    },
  ],

  buttons: {
    buttonList: [
      {
        text: "Make a Wish",
        url: "#",
      },
      {
        text: "Your Wishes",
        url: "#",
      },
      {
        text: "Wish Stories",
        url: "#",
      },
    ],
    style: {
      backgroundColor: "#6CA6C1", // 使用 Air superiority blue 顏色
      width: "90%",
      color: "#343434", // 使用 Jet 顏色
      borderRadius: "12px", // 調整按鈕圓角
      padding: "14px",
      fontSize: "16px",
      fontWeight: 600,
      fontFamily: "Poppins, sans-serif",
    },
  },

  background: {
    backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/sealink-4b0fd.appspot.com/o/backgroundimage%2F1727718758364.png?alt=media&token=bc0b7736-3434-4bf2-8862-519e48ff77ee)`,
    opacity: 0.9, // 調整背景透明度
    backgroundColor: "#2F3061", // 使用 Delft Blue 作為背景色
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  socialLinks: {
    iconList: [
      {
        id: "Facebook",
        name: "Facebook",
        href: "#",
        icon: "FaFacebook",
      },
      {
        id: "Instagram",
        name: "Instagram",
        href: "#",
        icon: "FaInstagram",
      },
      {
        id: "Snapchat",
        name: "Snapchat",
        href: "https://snapchat.com",
        icon: "FaSnapchat",
      },
    ],
    style: {
      color: "#FFE66D", // 使用 Naples yellow 顏色
      size: 30,
    },
  },

  avatar: {
    image: null, // 如果沒有圖片，這裡應該為 null
    style: {
      width: "100px",
      height: "100px",
    },
  },
};

// 更新 itemsOrder 的變量名稱
initialNinaWishCardContent.itemsOrder = [
  { id: `avatar-1`, type: "avatar" },
  ...initialNinaWishCardContent.texts.map((text, index) => ({
    id: `text-${index + 1}`,
    type: "text",
  })),
  { id: `icons-1`, type: "icons" },
  ...initialNinaWishCardContent.buttons.buttonList.map((button, index) => ({
    id: `button-${index + 1}`,
    type: "button",
  })),
];

export default initialNinaWishCardContent;
