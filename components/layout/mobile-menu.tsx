import Link from 'next/link';

interface MobileMenuProps {
  isOpen: boolean;
}

export default function MobileMenu({ isOpen }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="border-b bg-background md:hidden">
      <div className="flex flex-col space-y-4 p-4">
        <Link
          href="/"
          className="text-sm font-medium transition-colors hover:text-accent"
        >
          Home
        </Link>
        <Link
          href="/products"
          className="text-sm font-medium transition-colors hover:text-accent"
        >
          Products
        </Link>
        <Link
          href="/about"
          className="text-sm font-medium transition-colors hover:text-accent"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="text-sm font-medium transition-colors hover:text-accent"
        >
          Contact
        </Link>
      </div>
    </div>
  );
}