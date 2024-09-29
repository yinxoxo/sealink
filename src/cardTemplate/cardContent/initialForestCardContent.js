const initialForestCardContent = {
  texts: [
    {
      text: "Dale Vera",
      style: {
        color: "#3e5622",
        fontWeight: 700,
        fontSize: "24px",
        fontFamily: "Poppins, serif",
      },
    },
    {
      text: "an innovative solar design practice that brings solar energy into daily life.",
      style: {
        color: "#FFFFFF",
        fontWeight: 400,
        fontSize: "16px",
        fontFamily: "Aldrich, sans-serif",
      },
    },
  ],

  buttons: {
    buttonList: [
      {
        text: "Affliate Link",
        url: "#",
      },
      {
        text: "Vidcon Meet up",
        url: "#",
      },

      {
        text: "Contact",
        url: "#",
      },
    ],
    style: {
      backgroundColor: "#acad94",
      width: "90%",
      color: "#FFFFFF",
      borderRadius: "20px",
      padding: "14px",
      fontSize: "16px",
      fontWeight: 600,
      fontFamily: "Aldrich, sans-serif",
    },
  },

  background: {
    backgroundImage: `url(https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHRyZWV8ZW58MHx8MHx8fDA%3D)`,
    opacity: 0.8,
    backgroundColor: "#000000",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  socialLinks: {
    iconList: [
      {
        id: "Youtube",
        name: "Youtube",
        icon: "FaYoutube",
        href: "https://youtube.com",
      },
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
    ],
    style: {
      color: "#3e5622",
      size: 30,
    },
  },

  avatar: {
    image:
      "https://plus.unsplash.com/premium_photo-1681207567220-e29da6ce635b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aGlrZXJ8ZW58MHx8MHx8fDA%3D", // 頭像圖片
    style: {
      width: "100px",
      height: "100px",
    },
  },
};

initialForestCardContent.itemsOrder = [
  { id: `avatar-1`, type: "avatar" },
  ...initialForestCardContent.texts.map((text, index) => ({
    id: `text-${index + 1}`,
    type: "text",
  })),
  { id: `icons-1`, type: "icons" },
  ...initialForestCardContent.buttons.buttonList.map((button, index) => ({
    id: `button-${index + 1}`,
    type: "button",
  })),
];

export default initialForestCardContent;
