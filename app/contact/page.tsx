import { ContactLink } from "@/components/ContactLink";

function ContactPage() {
  return (
    <>
      <h1 className="mb-8">Contact</h1>
      <div className="flex flex-col gap-5">
        <ContactLink
          href="mailto:jack@jackbrind.com"
          label="Email"
          copyValue="jack@jackbrind.com"
        />
        <ContactLink
          href="https://www.linkedin.com/in/jackbrind/"
          label="LinkedIn"
          copyValue="https://www.linkedin.com/in/jackbrind/"
        />
        <ContactLink
          href="https://x.com/jack_brind"
          label="Twitter"
          copyValue="https://x.com/jack_brind"
        />
        <ContactLink
          href="https://github.com/jack-brind"
          label="GitHub"
          copyValue="https://github.com/jack-brind"
        />
        <ContactLink
          href="https://layers.to/brindo"
          label="Layers"
          copyValue="https://layers.to/brindo"
        />
      </div>
    </>
  );
}

export default ContactPage;
