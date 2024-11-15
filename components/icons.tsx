import Image from "next/image";

export const CoordinatorIcon = () => {
  return (
    <div className="border border-zinc-700 overflow-hidden rounded-full">
      <Image
        src="/co-ordinator.avif"
        alt="Co-ordinator"
        width={24}
        height={24}
      />
    </div>
  );
};

export const UserIcon = () => {
  return (
    <svg
      data-testid="geist-icon"
      height="16"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="16"
      style={{ color: "currentcolor" }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.75 0C5.95507 0 4.5 1.45507 4.5 3.25V3.75C4.5 5.54493 5.95507 7 7.75 7H8.25C10.0449 7 11.5 5.54493 11.5 3.75V3.25C11.5 1.45507 10.0449 0 8.25 0H7.75ZM6 3.25C6 2.2835 6.7835 1.5 7.75 1.5H8.25C9.2165 1.5 10 2.2835 10 3.25V3.75C10 4.7165 9.2165 5.5 8.25 5.5H7.75C6.7835 5.5 6 4.7165 6 3.75V3.25ZM2.5 14.5V13.1709C3.31958 11.5377 4.99308 10.5 6.82945 10.5H9.17055C11.0069 10.5 12.6804 11.5377 13.5 13.1709V14.5H2.5ZM6.82945 9C4.35483 9 2.10604 10.4388 1.06903 12.6857L1 12.8353V13V15.25V16H1.75H14.25H15V15.25V13V12.8353L14.931 12.6857C13.894 10.4388 11.6452 9 9.17055 9H6.82945Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};

export const ElonIcon = () => {
  return (
    <div className="border border-zinc-700 overflow-hidden rounded-full">
      <Image src="/elon.jpg" alt="Elon Musk" width={24} height={24} />
    </div>
  );
};

export const SteveIcon = () => {
  return (
    <div className="border border-zinc-700 overflow-hidden rounded-full">
      <Image src="/steve.jpg" alt="Steve Jobs" width={24} height={24} />
    </div>
  );
};

export const WarrenIcon = () => {
  return (
    <div className="border border-zinc-700 overflow-hidden rounded-full">
      <Image src="/warren.jpg" alt="Warren Buffet" width={24} height={24} />
    </div>
  );
};
