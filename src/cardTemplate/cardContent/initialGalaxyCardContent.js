const initialGalaxyCardContent = {
  texts: [
    {
      text: "Galactic Journey",
      style: {
        color: "#DDA0DD",
        fontWeight: 700,
        fontSize: "32px",
        fontFamily: "VT323, serif",
      },
    },
    {
      text: "Explore the mysteries of the universe",
      style: {
        color: "#DDA0DD",
        fontWeight: 400,
        fontSize: "18px",
        fontFamily: "VT323, serif",
      },
    },
  ],

  buttons: {
    buttonList: [
      {
        text: "Star Map",
        url: "#",
      },
      {
        text: "Galaxy Tours",
        url: "#",
      },
      {
        text: "Astronomy Blog",
        url: "#",
      },
      {
        text: "Contact Us",
        url: "#",
      },
    ],
    style: {
      backgroundColor: "#4B0082",
      width: "90%",
      color: "#FFFFFF",
      borderRadius: "3px",
      padding: "14px",
      fontSize: "16px",
      fontWeight: 600,
      fontFamily: "VT323, sans-serif",
    },
  },

  background: {
    backgroundImage: `url(https://images.unsplash.com/photo-1548346941-0f485f3ec808?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
    opacity: 0.8,
    backgroundColor: "#2E0854",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  socialLinks: {
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
        id: "Email",
        name: "Email",
        href: "mailto:hello@galaxy.com",
        icon: "FaEnvelope",
      },
    ],
    style: {
      color: "#DDA0DD",
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

initialGalaxyCardContent.itemsOrder = [
  { id: `avatar-1`, type: "avatar" },
  ...initialGalaxyCardContent.texts.map((text, index) => ({
    id: `text-${index + 1}`,
    type: "text",
  })),
  { id: `icons-1`, type: "icons" },
  ...initialGalaxyCardContent.buttons.buttonList.map((button, index) => ({
    id: `button-${index + 1}`,
    type: "button",
  })),
];

export default initialGalaxyCardContent;
