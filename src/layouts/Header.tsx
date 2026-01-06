import { GITHUB_REPO_URL } from '@/constant/constant';
import { useAppStore } from '@/stores/appStore';
import {
  FileText,
  Github,
  PanelLeftClose,
  PanelRightClose,
  Grid2x2,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  const { isExpandedSidebarSettings, setExpandedSidebarSettings } =
    useAppStore();

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
      <Link
        to="/"
        className="flex items-center gap-2 text-xl font-semibold text-gray-800"
      >
        <FileText size={20} />
        <span>
          <span className="text-emerald-500">Hi There</span>
        </span>
      </Link>
      <nav className="flex items-center gap-4">
        <Link
          to="/dashboard"
          className="flex items-center gap-1.5 text-sm px-2 py-1 rounded transition-colors"
        >
          <Grid2x2 size={20} />
          <span>My Resumes</span>
        </Link>
        <button
          onClick={() => setExpandedSidebarSettings(!isExpandedSidebarSettings)}
        >
          {isExpandedSidebarSettings ? (
            <PanelRightClose size={19} />
          ) : (
            <PanelLeftClose size={19} />
          )}
        </button>
        <Link
          to={GITHUB_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
        >
          <Github size={18} />
        </Link>
      </nav>
    </header>
  );
}
