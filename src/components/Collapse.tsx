import {
  ReactNode,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

interface CollapseProps {
  label: string;
  defaultOpen?: boolean;
  className?: string;
  children: ReactNode;
}

const Collapse = ({
  label,
  defaultOpen = false,
  className = "",
  children,
}: CollapseProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [shouldRender, setShouldRender] = useState(defaultOpen);
  const [height, setHeight] = useState<number | undefined>(
    defaultOpen ? undefined : 0
  );
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!contentRef.current) return;

    if (isOpen) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen, shouldRender]);

  const onTransitionEnd = useCallback(() => {
    if (!isOpen) {
      setShouldRender(false);
    }
  }, [isOpen]);

  const handleToggle = useCallback(() => {
    if (!isOpen) {
      setShouldRender(true);
    }
    setIsOpen((prev) => !prev);
  }, [isOpen]);

  return (
    <div className={`border rounded-lg bg-[var(--box-bg)] ${className}`}>
      <button
        onClick={handleToggle}
        className="w-full px-4 py-2 flex items-center justify-between rounded-lg transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <span className="font-medium">{label}</span>
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className="overflow-hidden transition-[height] duration-200 ease-in-out"
        style={{ height: height ? `${height}px` : "0px" }}
        onTransitionEnd={onTransitionEnd}
      >
        {shouldRender && (
          <div ref={contentRef} className="p-4 flex flex-col gap-1">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collapse;
