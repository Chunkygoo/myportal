import { useRouter } from "next/router";
import SessionAuth from "../../components/auth/SessionAuth";
import { useGetMyProjectsQuery } from "../../hooks/me";

const Projects = () => {
  const router = useRouter();
  const { projects, isLoading, isError } = useGetMyProjectsQuery();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;
  return (
    <SessionAuth>
      <div className="flex h-screen">
        <div className="m-auto">
          <div className="text-lg font-medium">Projects</div>
          <ul>
            {projects?.map((project) => (
              <li
                key={project.id}
                className="w-full bg-blue-500 text-white hover:bg-blue-200 hover:text-blue-500"
                onClick={() => void router.push(`/projects/${project.id}`)}
              >
                <div>
                  <span className="mr-4">{project.name}</span>
                  <span className="mr-4">{project.createdBy}</span>
                  <span className="mr-4">{project.createdAt}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SessionAuth>
  );
};

export default Projects;
