import { Link } from "@/i18n/navigation";

import { buttonVariants } from "@/components/ui/button";

type MessageWithLinkProps = {
  messageText: string;
  href: string;
  linkLabel: string;
};

export function MessageWithLink({ messageText, href, linkLabel }: Readonly<MessageWithLinkProps>) {
  return (
    <div className="text-center">
      <p>{messageText}</p>
      <Link href={href} className={buttonVariants({ variant: "link", className: "font-semibold" })}>
        {linkLabel}
      </Link>
    </div>
  );
}
