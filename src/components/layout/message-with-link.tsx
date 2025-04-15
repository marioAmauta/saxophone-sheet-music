import { Link } from "@/i18n/navigation";

import { buttonVariants } from "@/components/ui/button";

type MessageWithLinkProps = {
  messageText: string;
  href: string;
  dataCyLink: string;
  linkLabel: string;
};

export function MessageWithLink({ messageText, href, dataCyLink, linkLabel }: MessageWithLinkProps) {
  return (
    <div className="text-center">
      <p>{messageText}</p>
      <Link
        href={href}
        data-cy={dataCyLink}
        className={buttonVariants({ variant: "link", className: "font-semibold" })}
      >
        {linkLabel}
      </Link>
    </div>
  );
}
