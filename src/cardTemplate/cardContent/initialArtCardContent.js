const initialArtCardContent = {
  texts: [
    {
      text: "SHEILA",
      style: {
        color: "#8d4925",
        fontWeight: 700,
        fontSize: "36px",
        fontFamily: "Georgia, serif",
      },
    },
    {
      text: "HI!",
      style: {
        color: "#8d4925",
        fontWeight: 700,
        fontSize: "32px",
        fontFamily: "Arial, sans-serif",
      },
    },
    {
      text: "I AM SHEILA",
      style: {
        color: "#554f46",
        fontWeight: 700,
        fontSize: "20px",
        fontFamily: "Arial, sans-serif",
      },
    },
  ],

  buttons: {
    buttonList: [
      {
        text: "VISIT MY WEBSITE",
        url: "#",
      },
      {
        text: "MY SERVICES",
        url: "#",
      },
    ],
    style: {
      backgroundColor: "#87794e",
      width: "90%",
      color: "#ffffff",
      borderRadius: "20px",
      padding: "14px",
      fontSize: "14px",
      fontWeight: 400,
      fontFamily: "Arial, sans-serif",
      hover: {
        backgroundColor: "#746945",
      },
    },
  },

  background: {
    backgroundImage: null,
    opacity: 0.6,
    backgroundColor: "#f5f3ee",
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
        id: "Github",
        name: "Github",
        href: "#",
        icon: "FaGithub",
      },
      {
        id: "Youtube",
        name: "Youtube",
        icon: "FaYoutube",
        href: "https://youtube.com",
      },
    ],
    style: {
      color: "#d1c3a1",
      size: 40,
    },
  },

  avatar: {
    image:
      "https://images.unsplash.com/photo-1720048171419-b515a96a73b8?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // 頭像圖片
    style: {
      width: "100px",
      height: "100px",
    },
  },
};

initialArtCardContent.itemsOrder = [
  { id: `avatar-1`, type: "avatar" },
  ...initialArtCardContent.texts.map((text, index) => ({
    id: `text-${index + 1}`,
    type: "text",
  })),
  ...initialArtCardContent.buttons.buttonList.map((button, index) => ({
    id: `button-${index + 1}`,
    type: "button",
  })),
  { id: `icons-1`, type: "icons" },
];

export default initialArtCardContent;
