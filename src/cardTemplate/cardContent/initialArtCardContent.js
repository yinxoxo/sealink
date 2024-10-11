const initialArtCardContent = {
  texts: [
    {
      id: "text-1",
      text: "SHEILA",
      style: {
        color: "#8d4925",
        fontWeight: 700,
        fontSize: "36px",
        fontFamily: "Georgia, serif",
      },
    },
    {
      id: "text-2",
      text: "HI!",
      style: {
        color: "#8d4925",
        fontWeight: 700,
        fontSize: "32px",
        fontFamily: "Arial, sans-serif",
      },
    },
    {
      id: "text-3",
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
      { id: "button-1", text: "VISIT MY WEBSITE", url: "https://example.com" },
      { id: "button-2", text: "MY SERVICES", url: "https://example.com" },
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
    id: "icon-1",
    iconList: [
      {
        id: "Facebook",
        name: "Facebook",
        href: "https://facebook.com",
        icon: "FaFacebook",
      },
      {
        id: "Github",
        name: "Github",
        href: "https://github.com",
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
    id: "avatar-1",
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
  { id: "text-1", type: "text" },
  { id: "text-2", type: "text" },
  { id: "text-3", type: "text" },
  { id: "button-1", type: "button" },
  { id: "button-2", type: "button" },
  { id: `icons-1`, type: "icons" },
];

export default initialArtCardContent;
