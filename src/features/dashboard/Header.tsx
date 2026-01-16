import { Save, Upload } from 'lucide-react';

type HeaderProps = {
  onSave: () => void;
  onImport: () => void;
};

export default function Header({ onSave, onImport }: HeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-2xl font-bold text-gray-800">My Resumes</h1>
      <div className="flex items-center gap-3">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white font-medium rounded hover:bg-orange-600 transition-colors"
          onClick={onSave}
        >
          <Save size={16} />
          Save as
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white font-medium rounded hover:bg-gray-800 transition-colors"
          onClick={onImport}
        >
          <Upload size={16} />
          Import Markdown
        </button>
      </div>
    </div>
  );
}
