const initialSimpleCardContent = {
  texts: [
    {
      text: "Hydra",
      style: {
        color: "#336a5a",
        fontWeight: 700,
        fontSize: "36px",
        fontFamily: "Georgia, serif",
      },
    },
    {
      text: "Hydra Juice",
      style: {
        color: "#000000",
        fontWeight: 400,
        fontSize: "18px",
        fontFamily: "Arial, sans-serif",
      },
    },
    {
      text: "Your daily dose of vitamin C",
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
      {
        text: "Our drinks",
        url: "https://example.com/our-drinks",
      },
      {
        text: "Find us",
        url: "https://example.com/find-us",
      },
      {
        text: "Wellbeing",
        url: "https://example.com/wellbeing",
      },
    ],
    style: {
      backgroundColor: "#F0F0F0",
      width: "90%",
      color: "#000000",
      borderRadius: "20px",
      padding: "14px",
      fontSize: "14px",
      fontWeight: 400,
      fontFamily: "Arial, sans-serif",
    },
  },
  backgroundSettings: {
    backgroundImage: `url(https://images.unsplash.com/photo-1725785897139-1a7834b62e2f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
    opacity: 0.6,
    backgroundColor: "",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  avatar: {
    image: `url(https://images.unsplash.com/photo-1498982261566-1c28c9cf4c02?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
    style: {
      width: "100px",
      height: "100px",
    },
  },
};

export default initialSimpleCardContent;
