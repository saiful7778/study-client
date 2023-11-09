const navLinks = [
  {
    _id: "nv1",
    navName: "home",
    path: "/",
  },
  {
    _id: "nv2",
    navName: "assignments",
    path: "/assignments",
    hasDropDown: true,
    dropDown: [
      {
        _id: "nvdp1",
        navName: "create assignment",
        path: "/assignments/create_new",
      },
      {
        _id: "nvdp2",
        navName: "my assignments",
        path: "/assignments/my_assignments",
      },
      {
        _id: "nvdp3",
        navName: "submitted assignments",
        path: "/assignments/submit",
      },
    ],
  },
];

const accordionData = {
  accordionName: "faq-accordion",
  children: [
    {
      _id: "ac1",
      header: "How do I create a study group?",
      content:
        'To create a study group, log in to your account, go to your dashboard, and click on the "Create Group" button. Fill in the details, set the group\'s purpose, and invite your friends to join!',
    },
    {
      _id: "ac2",
      header: "Can I join multiple study groups?",
      content:
        "Absolutely! You can join multiple study groups to connect with students from different courses or interests.",
    },
    {
      _id: "ac3",
      header: "How do I submit an assignment?",
      content:
        'To submit an assignment, navigate to the assignment project, click on "Submit Assignment," and upload your file. You can also provide a description or notes for your submission.',
    },
    {
      _id: "ac4",
      header: 'Is "Study" free to use?',
      content:
        'Yes, "study" offers a free basic plan with essential features. We also provide premium plans with additional benefits for those seeking an enhanced experience.',
    },
    {
      _id: "ac5",
      header: "What if I encounter technical issues or have questions?",
      content:
        "Our dedicated support team is available 24/7 to assist you. Feel free to reach out to us via the Contact Us section, and we'll be happy to help!",
    },
  ],
};

const footerNavLinks = [
  { _id: "ftnv1", navName: "all assignment", path: "/assignments" },
  {
    _id: "ftnv2",
    navName: "create assignment",
    path: "/assignments/create_new",
  },
  {
    _id: "ftnv3",
    navName: "my assignments",
    path: "/assignments/my_assignments",
  },
  {
    _id: "ftnv4",
    navName: "submitted assignments",
    path: "/assignments/submit",
  },
];

export { accordionData, navLinks, footerNavLinks };
