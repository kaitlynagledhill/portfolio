import FadeIn from "./FadeIn";

const links = [
  {
    href: "kaitlynagledhill@gmail.com",
    icon: "ti ti-mail",
    label: "Email me",
    className: "clink clink-email",
    external: false,
  },
  {
    href: "https://github.com/kaitlynagledhill",
    icon: "ti ti-brand-github",
    label: "GitHub",
    className: "clink clink-github",
    external: true,
  },
  {
    href: "https://linkedin.com/in/kaitlyn-gledhill",
    icon: "ti ti-brand-linkedin",
    label: "LinkedIn",
    className: "clink clink-linkedin",
    external: true,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-bg" aria-hidden="true" />
      <div className="contact-orb contact-orb-1" aria-hidden="true" />
      <div className="contact-orb contact-orb-2" aria-hidden="true" />
      <div className="contact-orb contact-orb-3" aria-hidden="true" />

      <div className="contact-inner">
        <FadeIn direction="left">
          <p className="contact-headline">
            <span className="contact-headline-white">Let&apos;s build</span>
            <br />
            <span className="contact-headline-grad">something great.</span>
          </p>
          <p className="contact-sub">
            Seeking full-time roles in software engineering — full-stack,
            frontend, or backend.
            <br />
            Based in Raleigh, NC · open to remote or relocation.
          </p>
        </FadeIn>

        <FadeIn direction="right" delay={0.15}>
          <div className="contact-links">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={link.className}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <i className={link.icon} aria-hidden="true" />
                {link.label}
              </a>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
