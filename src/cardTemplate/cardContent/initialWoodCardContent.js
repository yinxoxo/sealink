const initialWoodCardContent = {
  texts: [
    {
      id: "text-1",
      text: "Chris",
      style: {
        color: "#8C8276",
        fontWeight: 700,
        fontSize: "48px",
        fontFamily: "Dancing Script, serif",
      },
    },
    {
      id: "text-2",
      text: "Professional title | Company",
      style: {
        color: "#000000",
        fontWeight: 400,
        fontSize: "18px",
        fontFamily: "Dancing Script, sans-serif",
      },
    },
    {
      id: "text-3",
      text: "+46 123456789",
      style: {
        color: "#808080",
        fontWeight: 400,
        fontSize: "14px",
        fontFamily: "Arial, sans-serif",
      },
    },
    {
      id: "text-4",
      text: "hello@domain.com",
      style: {
        color: "#808080",
        fontWeight: 400,
        fontSize: "14px",
        fontFamily: "Arial, sans-serif",
      },
    },
  ],

  buttons: {
    buttonList: [
      { id: "button-1", text: "Our shop", url: "https://example.com" },
      { id: "button-2", text: "Find us", url: "https://example.com" },
    ],
    style: {
      backgroundColor: "#A89F94",
      width: "90%",
      color: "#fff",
      borderRadius: "20px",
      padding: "14px",
      fontSize: "14px",
      fontWeight: 400,
      fontFamily: "Oswald, sans-serif",
    },
  },

  background: {
    backgroundImage: `url(https://images.unsplash.com/photo-1725714354686-0a8b522037bd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
    opacity: 0.6,
    backgroundColor: "#f1f1f1",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  socialLinks: {
    id: "icon-1",
    iconList: [
      {
        id: "Instagram",
        name: "Instagram",
        href: "https://instagram.com",
        icon: "FaInstagram",
      },
      {
        id: "Linkedin",
        name: "Linkedin",
        href: "https://linkedin.com",
        icon: "FaLinkedin",
      },
      {
        id: "Github",
        name: "Github",
        href: "https://github.com",
        icon: "FaGithub",
      },
      {
        id: "Email",
        name: "Email",
        href: "mailto:hello@domain.com",
        icon: "FaEnvelope",
      },
    ],
    style: {
      color: "#A89F94",
      size: 30,
    },
  },

  avatar: {
    id: "avatar-1",
    image:
      "https://plus.unsplash.com/premium_photo-1673757121102-0ca51260861f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // 頭像圖片
    style: {
      width: "100px",
      height: "100px",
    },
  },
};

initialWoodCardContent.itemsOrder = [
  { id: `avatar-1`, type: "avatar" },
  { id: "text-1", type: "text" },
  { id: "text-2", type: "text" },
  { id: "text-3", type: "text" },
  { id: "text-4", type: "text" },
  { id: `icons-1`, type: "icons" },
  { id: "button-1", type: "button" },
  { id: "button-2", type: "button" },
];

export default initialWoodCardContent;
