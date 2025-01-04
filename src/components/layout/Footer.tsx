import { Footer } from "flowbite-react";

const FooterComponent = () => {
  return (
    <Footer
      bgDark
      container
      theme={{
        root: {
          base: "rounded-none",
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
      </Footer.LinkGroup>
    </Footer>
  );
};

export default FooterComponent;
