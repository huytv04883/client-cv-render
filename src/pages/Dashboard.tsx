import Header from '@/components/dashboard/Header';
import NewProject from '@/components/dashboard/NewProject';
import ProjectCard from '@/components/dashboard/ProjectCard';
import type { Project } from '@/types/project.type';

// Mock data projects
//@TODO: load data from backend
const mockProjects: Project[] = [
  {
    id: crypto.randomUUID(),
    name: 'New Project',
    updatedAt: '2025/12/24 07:42:30',
    createdAt: '2025/12/24 07:42:30',
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-[calc(100vh-56px)] p-4 max-w-screen-2xl mx-auto">
      <Header onSave={() => {}} onImport={() => {}} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <NewProject />
        {mockProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onDuplicate={() => {}}
            onDelete={() => {}}
          />
        ))}
      </div>
    </div>
  );
}
