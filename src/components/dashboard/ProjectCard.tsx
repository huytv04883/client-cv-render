import type { Project } from '@/types/project.type';
import { Copy, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

type ProjectCardProps = {
  project: Project;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function ProjectCard({
  project,
  onDuplicate,
  onDelete,
}: ProjectCardProps) {
  return (
    <div className="w-60 relative">
      <Link
        to={`/editor/${project.id}`}
        className="block h-80 bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
      >
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.name}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="w-full h-full bg-white p-4 text-xs text-gray-400">
            <div className="text-center text-blue-600 font-bold text-sm mb-1">
              No Preview Available
            </div>
          </div>
        )}
      </Link>
      <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          title="Duplicate"
          onClick={() => onDuplicate(project.id)}
        >
          <Copy size={16} />
        </button>
        <button
          className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          title="Delete"
          onClick={() => onDelete(project.id)}
        >
          <Trash2 size={16} />
        </button>
      </div>
      <div className="mt-3 text-center">
        <h3 className="font-medium text-gray-800">{project.name}</h3>
      </div>
    </div>
  );
}
