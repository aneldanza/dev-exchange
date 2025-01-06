import { Footer } from "flowbite-react";

const FooterComponent = () => {
  return (
    <Footer
      bgDark
      container
      theme={{
        root: {
          base: "rounded-none text-white",
          bgDark: "bg-appGray-900",
        },
        groupLink: {
          base: "text-white ",
        },
        copyright: {
          base: "text-white",
        },
      }}
    >
      <Footer.Copyright href="/" by="DevExchange" year={2025} />
      <Footer.LinkGroup>
        <Footer.Link href="/">Home</Footer.Link>
        <Footer.Link href="https://github.com/aneldanza">GitHub</Footer.Link>
        <Footer.Link href="https://www.linkedin.com/in/anel-danza-a9591868/">
          LinkedIn
        </Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
};

export default FooterComponent;
