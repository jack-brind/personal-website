import { SmartLink } from "./SmartLink";
import { Separator } from "./ui/Separator";

function Footer() {
  return (
    <div className="flex flex-col gap-12">
      <Separator />
      <footer>
        <ul className="flex items-center gap-6">
          <SmartLink href="/shots" variant="nav">
            Shots
          </SmartLink>
          <SmartLink href="/now" variant="nav">
            Now
          </SmartLink>
          <SmartLink href="/uses" variant="nav">
            Uses
          </SmartLink>
          <SmartLink href="/colophon" variant="nav">
            Colophon
          </SmartLink>
          <SmartLink href="/changelog" variant="nav">
            Changelog
          </SmartLink>
        </ul>
      </footer>
    </div>
  );
}

export default Footer;
