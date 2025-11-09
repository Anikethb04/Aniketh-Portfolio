import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="nav-link flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-muted-foreground hover:text-primary"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <i className="fas fa-sun text-yellow-400"></i>
      ) : (
        <i className="fas fa-moon text-blue-400"></i>
      )}
      <span className="hidden xl:inline">
        {theme === "dark" ? "Light" : "Dark"}
      </span>
    </button>
  );
}