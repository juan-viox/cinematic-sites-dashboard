'use client';

import ProjectCard from '@/components/ProjectCard';
import { ProjectData } from '@/lib/projects';

interface ProjectListProps {
  projects: ProjectData[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, i) => (
        <ProjectCard
          key={project.client.slug}
          slug={project.client.slug}
          name={project.client.name}
          businessType={project.client.businessType}
          phase={project.status.phase}
          sourceUrl={project.client.sourceUrl}
          index={i}
        />
      ))}
    </div>
  );
}
