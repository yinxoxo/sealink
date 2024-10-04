const initialBreadCardContent = {
  texts: [
    {
      text: "Honeyed Pastry",
      style: {
        color: "#2c2f96",
        fontWeight: 700,
        fontSize: "24px",
        fontFamily: "Lobster, sans-serif",
      },
    },
    {
      text: "Good pastry for a good day",
      style: {
        color: "#2c2f96",
        fontWeight: 400,
        fontSize: "16px",
        fontFamily: "Lobster, sans-serif",
      },
    },
  ],

  buttons: {
    buttonList: [
      {
        text: "Menu",
        url: "#",
      },
      {
        text: "Online order",
        url: "#",
      },
      {
        text: "Our story",
        url: "#",
      },
      {
        text: "Locations",
        url: "#",
      },
    ],
    style: {
      backgroundColor: "#ffffff",
      width: "75%",
      color: "#2c2f96",
      borderRadius: "8px",
      padding: "14px",
      fontSize: "14px",
      fontWeight: 400,
      fontFamily: "Poppins, sans-serif",
    },
  },

  background: {
    backgroundImage: `url(https://images.unsplash.com/photo-1467189741806-ee3dc79755eb?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
    opacity: 0.3,
    backgroundColor: "#eaeaea",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  socialLinks: {
    iconList: [
      {
        id: "Facebook",
        name: "Facebook",
        href: "https://facebook.com",
        icon: "FaFacebook",
      },
      {
        id: "Instagram",
        name: "Instagram",
        href: "#https://instagram.com",
        icon: "FaInstagram",
      },
      {
        id: "Youtube",
        name: "Youtube",
        icon: "FaYoutube",
        href: "https://youtube.com",
      },
    ],
    style: {
      color: "#2c2f96",
      size: 30,
    },
  },

  avatar: {
    image: null,
    style: {
      width: "100px",
      height: "100px",
    },
  },
};

initialBreadCardContent.itemsOrder = [
  { id: `avatar-1`, type: "avatar" },
  ...initialBreadCardContent.texts.map((text, index) => ({
    id: `text-${index + 1}`,
    type: "text",
  })),
  { id: `icons-1`, type: "icons" },
  ...initialBreadCardContent.buttons.buttonList.map((button, index) => ({
    id: `button-${index + 1}`,
    type: "button",
  })),
  { id: `productImage-1`, type: "productImage" },
];

export default initialBreadCardContent;
