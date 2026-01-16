import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NewProject() {
  return (
    <Link
      to={`/editor/${crypto.randomUUID()}`}
      className="flex flex-col items-center justify-center h-80 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
    >
      <Plus size={48} className="text-gray-500" />
    </Link>
  );
}
