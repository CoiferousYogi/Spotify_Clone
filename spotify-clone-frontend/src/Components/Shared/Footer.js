const Footer = () => {
  return (
    <footer className="bg-[#191414] text-center py-8 w-full text-xs overflow-x-hidden">
      <p className="text-gray-400 text-xs">
        <span>This site is protected by reCAPTCHA and the Google </span>
        <a
          href="https://policies.google.com/privacy"
          className="text-gray-400 hover:text-[#1db954] underline"
        >
          Privacy Policy
        </a>
        <span> and </span>
        <a
          href="https://policies.google.com/terms"
          className="text-gray-400 hover:text-[#1db954] underline"
        >
          Terms of Service
        </a>
        <span> apply.</span>
      </p>
    </footer>
  );
};

export default Footer;
