type HeaderProps = {
  title: string;
  description?: string;
};

function Header({ title, description }: HeaderProps) {
  return (
    <header className="mb-8 border-b border-gray-300 pb-6">

      <h1 className="text-3xl font-bold text-ink">
        {title}
      </h1>

      {description && (
        <p className="mt-2 text-gray-600">
          {description}
        </p>
      )}

    </header>
  );
}

export default Header;
