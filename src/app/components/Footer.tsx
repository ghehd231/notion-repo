import { GitHubLogoIcon, EnvelopeOpenIcon } from "@radix-ui/react-icons";

const Footer = () => {
  return (
    <section className="flex items-center justify-center w-full h-[100px] notion-item-default">
      <div className="flex items-start justify-between w-full h-full max-w-screen-xl px-6 py-3 xl:px-0">
        <div className="flex items-start">
          <span>© haddy-tech.kro.kr</span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <EnvelopeOpenIcon />
            <span>ghehd231@naver.com</span>
          </div>
          <div className="flex items-center gap-2">
            <GitHubLogoIcon />
            <span>github.com/ghehd231</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
