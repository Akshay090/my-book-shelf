import Link from 'next/link';

const StyledLink = ({ href, children, className }) => (
  <Link href={href} passHref>
    <a className={className}>{children}</a>
  </Link>
);
export default StyledLink;
